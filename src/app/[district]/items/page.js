import ProductsPage from "@/app/items/page";

export const revalidate = 3600; // Revalidate cache every hour

export default async function Page({ params }) {

  const { district = "jaipur" } = await params;

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return <ProductsPage city={city} />;
}