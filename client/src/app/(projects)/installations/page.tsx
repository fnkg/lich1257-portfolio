import projects from '@/lib/dataProjects.json';
import ProjectSlider from '@/ui/projects/ProjectSlider';
import Layout from '@/src/app/(projects)/layout';

export const metadata = {
    title: "installations",
    description: "installations projects",
}

const Installations = () => {
    const projectsList = projects.installations;
    const heading = metadata.title

    return (
        <Layout pageHeading={heading}>
            <main className="relative w-full m-auto">
                <ProjectSlider projects={projectsList} />
            </main>
        </Layout>
    );
}

export default Installations;