import { ADMIN_API_BASE_URL, getWebsiteId } from "./catalog-utils.js";

export const db = {};

export function doc(_db, ...parts) {
  return { path: parts.join("/") };
}

export function collection(_db, ...parts) {
  return { path: parts.join("/") };
}

export async function getDoc(ref) {
  const path = ref.path || "";
  const parts = path.split("/");
  const websiteId = getWebsiteId();
  const isClient = typeof window !== "undefined";
  const base = isClient ? "" : ADMIN_API_BASE_URL.replace(/\/$/, "");

  // If requesting website pages like websites/<id>/pages/contact
  if (parts.includes("pages")) {
    const pageName = parts[parts.indexOf("pages") + 1] || "home";
    const endpoint = `${base}/api/site-data?websiteId=${encodeURIComponent(websiteId)}&type=${encodeURIComponent(pageName)}&_t=${Date.now()}`;
    const res = await fetch(endpoint, { cache: "no-store" });
    const data = await res.json();
    const docData = data?.data !== undefined ? data.data : data;
    return {
      exists: () => Boolean(docData && Object.keys(docData).length > 0),
      data: () => docData || {},
    };
  }

  // General local-firestore lookup
  const firestoreEndpoint = isClient
    ? `/api/legacy-data?path=${encodeURIComponent(path)}&_t=${Date.now()}`
    : `${base}/api/local-firestore`;

  if (isClient) {
    const res = await fetch(firestoreEndpoint, { cache: "no-store" });
    const data = await res.json();
    return {
      exists: () => Boolean(data?.data && Object.keys(data.data).length > 0),
      data: () => data?.data || {},
    };
  }

  const res = await fetch(firestoreEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "get", path }),
    cache: "no-store",
    next: { revalidate: 0 },
  });
  const data = await res.json();
  return {
    exists: () => Boolean(data?.data && Object.keys(data.data).length > 0),
    data: () => data?.data || {},
  };
}

export async function getDocs(ref) {
  const path = ref.path || "";
  const isClient = typeof window !== "undefined";
  const base = isClient ? "" : ADMIN_API_BASE_URL.replace(/\/$/, "");

  if (isClient) {
    const res = await fetch(`/api/legacy-data?path=${encodeURIComponent(path)}&_t=${Date.now()}`, {
      cache: "no-store",
    });
    const data = await res.json();
    const docs = (data?.docs || []).map((x) => ({
      id: x.id,
      data: () => x.data || x,
    }));
    return {
      empty: docs.length === 0,
      docs,
      forEach: (fn) => docs.forEach(fn),
    };
  }

  const res = await fetch(`${base}/api/local-firestore`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "list", path }),
    cache: "no-store",
    next: { revalidate: 0 },
  });
  const data = await res.json();
  const rawList = Array.isArray(data?.data)
    ? data.data
    : data?.data && typeof data.data === "object"
    ? Object.entries(data.data).map(([id, val]) => ({ id, ...val }))
    : [];

  const docs = rawList.map((x) => ({
    id: x.id,
    data: () => x,
  }));

  return {
    empty: docs.length === 0,
    docs,
    forEach: (fn) => docs.forEach(fn),
  };
}

export async function addDoc(ref, data) {
  const path = ref.path || "";
  const websiteId = getWebsiteId();
  const isClient = typeof window !== "undefined";

  if (isClient) {
    const endpoint = path.includes("productQueries")
      ? "/api/product-query"
      : "/api/contact-query";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        websiteId,
        createdAt: data?.createdAt || new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Submission failed");
    }

    return res.json();
  }

  // Server-side
  let targetPath = path;
  if (!targetPath) {
    targetPath = `websitesQueries/${websiteId}/contactQueries`;
  } else if (!targetPath.startsWith("websitesQueries/")) {
    if (targetPath.includes("productQueries")) {
      targetPath = `websitesQueries/${websiteId}/productQueries`;
    } else {
      targetPath = `websitesQueries/${websiteId}/contactQueries`;
    }
  }

  const payload = {
    action: "add",
    path: targetPath,
    data: {
      ...data,
      websiteId,
      createdAt: data?.createdAt || new Date().toISOString(),
    },
  };

  const res = await fetch(
    `${ADMIN_API_BASE_URL.replace(/\/$/, "")}/api/local-firestore`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Submission failed");
  }

  return res.json();
}

export function onSnapshot(ref, onNext, onError) {
  let stopped = false;
  const run = async () => {
    try {
      const snap = await getDoc(ref);
      if (!stopped) onNext({ exists: snap.exists, data: snap.data });
    } catch (e) {
      if (!stopped && onError) onError(e);
    }
  };
  run();
  const timer = setInterval(run, 5000);
  return () => {
    stopped = true;
    clearInterval(timer);
  };
}
