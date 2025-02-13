// import projects from '@/lib/dataProjects.json';
// import ProjectSlider from '@/ui/projects/ProjectSlider';
// import Layout from '@/app/(projects)/layout';

// export const metadata = {
//     title: "3d",
//     description: "3d projects",
// }

// const ThreeD = () => {
//     const projectsList = projects.threed;
//     const heading = metadata.title

//     return (
//         <Layout pageHeading={heading}>
//             <main className="relative w-full m-auto">
//                 <ProjectSlider projects={projectsList} />
//             </main>
//         </Layout>
//     );
// }

// export default ThreeD;

import ProjectSlider from '@/ui/projects/ProjectSlider';
import Layout from '@/src/app/(projects)/layout';
import { fetchProjectsByCategory } from '@/src/data/fetchProjects';

export const metadata = {
    title: "3d",
    description: "3d projects",
};

const ThreeD = async () => {
    // Загружаем данные на сервере
    const projects = await fetchProjectsByCategory('3d'); // Название категории

    console.log(`HEHEHEHEH ${projects}`)

    const heading = metadata.title;

    return (
        <Layout pageHeading={heading}>
            <main className="relative w-full m-auto">
                <ProjectSlider projects={projects} />
            </main>
        </Layout>
    );
};

export default ThreeD;