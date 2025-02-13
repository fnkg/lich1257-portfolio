import projects from '@/lib/dataProjects.json';
import ProjectSlider from '@/ui/projects/ProjectSlider';
import Layout from '@/src/app/(projects)/layout';

export const metadata = {
    title: "art pieces",
    description: "art content",
}

const ArtPieces = () => {
    const projectsList = projects.artPieces;
    const heading = metadata.title

    return (
        <Layout heading={heading}>
            <main className="relative w-full m-auto">
                <ProjectSlider projects={projectsList} />
            </main>
        </Layout>
    );
}

export default ArtPieces;