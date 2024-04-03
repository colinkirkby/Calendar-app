import { GetServerSideProps, NextPage } from "next";

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page: NextPage<PageProps> = ({ params, searchParams }) => {
  return <h1>My Page</h1>;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async context => {
  // You can do something with context.params or context.query here
  return { props: {} }; // Pass props to the page
};
