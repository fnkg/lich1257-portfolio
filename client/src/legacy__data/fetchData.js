// const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

// export const fetchContacts = async () => {
//     const path = "/api/global?populate[navigation][populate][0]=Contacts";
//     const url = new URL(path, baseUrl);
//     const res = await fetch(url);

//     if (!res.ok) throw new Error("Failed to fetch contacts");

//     const data = await res.json();

//     return data.data.navigation.Contacts;
// };

// export const fetchCategories = async () => {
//     const res = await fetch(`${baseUrl}/api/global?populate[navigation][populate][0]=Categories`);

//     if (!res.ok) throw new Error('Failed to fetch categories');

//     const data = await res.json();

//     return data.data.navigation.Categories;
// };

// export const fetchProjectsByCategory = async (categoryName) => {
//     const res = await fetch(`${baseUrl}/api/projects?filters[categories][categoryName][$eq]=${categoryName}&populate=*`);

//     if (!res.ok) throw new Error('Failed to fetch projects');

//     const data = await res.json();

//     return data.data;
// };

// export const fetchBackground = async () => {
//     const res = await fetch(`${baseUrl}/api/global/?populate[background][populate]=true`);

//     if (!res.ok) throw new Error('Failed to fetch background');

//     const data = await res.json();

//     return data.data.background.url;
// };
