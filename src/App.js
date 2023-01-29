import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import { useEffect, useState } from "react";

builder.init('982ee33bd7874481898b4317400baa52')

export default function App () {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

  // get the page content from Builder
  useEffect( () => {
    async function fetchContent() {
      const content = await builder.get('page', {
        url: window.location.pathname
      }).promise();

      setContent(content);
      setNotFound(!content);
    }
    fetchContent();
  }, []);
  // if no page is found, return a 404 page
  if (notFound && !isPreviewingInBuilder) {
    return <div>Not Found 404 Error</div>
  }

  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <BuilderComponent model="page" content={content} />
    </>
  );
}