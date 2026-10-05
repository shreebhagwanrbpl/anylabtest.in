const noStore={cache:"no-store",headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache"}};
async function requestJson(path){const url=`${path}${path.includes("?")?"&":"?"}_t=${Date.now()}`;const r=await fetch(url,noStore);if(!r.ok)throw new Error(`Data API ${r.status}: ${path}`);return r.json();}
export async function fetchFullCatalog(){const d=await requestJson("/api/catalog");const x=Array.isArray(d)?d:(d?.products||d?.data||d?.catalog||[]);return Array.isArray(x)?x:[];}
export async function fetchSiteData(page){const d=await requestJson(`/api/site-data?page=${encodeURIComponent(page)}`);return d?.data!==undefined?d.data:d;}
export async function fetchHomeData(){return fetchSiteData("home")} export async function fetchContactData(){return fetchSiteData("contact")} export async function fetchServicesData(){return fetchSiteData("services")} export async function fetchAboutData(){return fetchSiteData("about")}
export async function fetchDistrictData(district){const d=await requestJson(`/api/site-data?type=district&district=${encodeURIComponent(district||"")}`);return d?.data!==undefined?d.data:d;}
export async function fetchDistrictsList(){const d=await requestJson("/api/site-data?page=districts");return d?.districts||d?.data||[]} export const fetchDistrictsInState=fetchDistrictsList;
export async function fetchProductBySlug(slug){const l=await fetchFullCatalog(),t=decodeURIComponent(String(slug||"")).toLowerCase();return l.find(p=>String(p.slug||"").toLowerCase()===t||makeSlug(p.title||p.name||"")===t||String(p.id||p.uid||"").toLowerCase()===t)||null;}
export {makeSlug,resolveImageUrl} from "./catalog-utils.js";
