import Layout from "../../components/layout";
import { getAllChaptersId, getChapterData } from "../../lib/chapters";

export default function Chapter({ chapterData }) {
  return (
    <Layout>
      {chapterData.name}
      <br/>
      {chapterData.id}
    </Layout>
  ) 
}

export async function getStaticProps({ params }) {
  const chapterData = await getChapterData(params.id);
  return {
    props: {
      chapterData,
    }
  }
}

export async function getStaticPaths() {
  const paths = await getAllChaptersId();
  return {
    paths,
    fallback: false,
  }
}
