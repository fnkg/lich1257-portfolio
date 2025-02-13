import projects from '@/lib/dataProjects.json';
import ProjectSlider from '@/ui/projects/ProjectSlider';
import Layout from '@/src/app/(projects)/layout';

export const metadata = {
    title: "light",
    description: "light engineering projects",
}

const Light = () => {
    const projectsList = projects.light;
    const heading = metadata.title

    return (
        <Layout pageHeading={heading}>
            <main className="relative w-full m-auto">
                <ProjectSlider projects={projectsList} />
            </main>
        </Layout>
    );
}

export default Light;