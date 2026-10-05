# MongoDB/Admin API migration — anylabtest.in

Website ID: `anylabtestin`
Company ID: `rajbiosis`
Admin API: `https://admin.rajbiosis.app`

All dynamic runtime reads now use the live Admin API as the primary and only source: catalog, products, categories, brands, home/about/services/contact data and district data. Frontend same-origin API routes proxy these calls with `force-dynamic`, `no-store` and cache-busting timestamps. Contact and product enquiries POST to the Admin API. Local SQLite is not used for runtime data, so deployed sites do not depend on a mounted database file.
