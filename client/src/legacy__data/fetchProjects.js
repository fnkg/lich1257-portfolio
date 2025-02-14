import axios from 'axios';
import qs from 'qs';

const API_URL = 'http://localhost:3001/api';
const API_TOKEN = process.env.STRAPI_API_TOKEN;

export const fetchProjectsByCategory = async (category) => {
    console.log('api url', API_URL);
    console.log('api token', API_TOKEN);



    const query = qs.stringify({
        filters: {
            categories: {
                name: {
                    $eq: category, // Фильтрация по названию категории
                },
            },
        },
        populate: '*', // Включаем вложенные данные
    }, {
        encodeValuesOnly: true, // Убедимся, что значения корректно кодируются
    });

    console.log('Query string:', query);

    try {
        const response = await axios.get(`${API_URL}/projects?${query}`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        })

        return response.data.data.map((project) => ({
            id: project.id,
            name: project.attributes.name,
            descriptionEN: project.attributes.descriptionEN,
            descriptionRU: project.attributes.descriptionRU,
            image: project.attributes.image?.data?.attributes?.url || null, // Проверка наличия изображения
        }));
    } catch (error) {
        console.error('Ошибка при загрузке проектов:', error);
        return [];
    }
};

// export const fetchProjectsByCategory = async (categoryName) => {
//     const res = await fetch(`${API_URL}/api/projects?filters[categories][categoryName][$eq]=${categoryName}&populate=*`);
//     if (!res.ok) {
//         throw new Error('Ошибка при загрузке проектов из категории');
//     }
//     const data = await res.json();
//     console.log(res)
//     return data.data;
// };
