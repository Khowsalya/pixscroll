// import ContentLoader from 'react-content-loader';
// import react from 'react';

// const MyLoader = (props)=>{
//     return(
//     <div className="h-[100vh] flex justify-center items-start">
//        <ContentLoader viewBox="0 0 820 450" height={450} width={820} {...props}>
//       <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
//       <rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
//       <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
//       <rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
//       <rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
//       <rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
//     </ContentLoader>
//     </div>
//     )
// }

// export default MyLoader;

// orchestration component:
// Components/PageLoader/PageLoader.jsx
import ContentLoader              from "react-content-loader";
import { pageLoaderStyles, LOADER_RECTS } from "./style";

function PageLoader(props) {
  return (
    <div className={pageLoaderStyles.wrapper}>
      <ContentLoader viewBox="0 0 820 450" height={450} width={820} {...props}>
        {LOADER_RECTS.map((rect, i) => (
          <rect key={i} {...rect} />
        ))}
      </ContentLoader>
    </div>
  );
}

export default PageLoader;