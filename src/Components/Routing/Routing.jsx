import {Routes,Route} from 'react-router-dom'
import CustomErrorBoundary from '../CustomErrorBoundary/CustomErrorBoundary';
import MainLayout from '../../Pages/layout'
import { lazy,Suspense } from 'react';
import PageLoader from '../PageLoader/PageLoader';

const Home = lazy(() =>import ('../../Pages/Home'));
const ImageDetails = lazy(() =>import ('../../Pages/ImageDetails'));
const ImageStats = lazy(() =>import ('../../Pages/ImageStats'));

function Routing(){

    return(
        <CustomErrorBoundary>
        <Routes>
            <Route path='/' element={<MainLayout />} >
                <Route index element = {
                    <Suspense fallback={<PageLoader />}>
                    <Home />
                    </Suspense>
                } />
            
            {/* <Route path='/photos/:id' element={<ImageDetails />} />  */}
            
                   <Route path='/photos' element={
                    <Suspense fallback={<PageLoader />}>
                    <ImageDetails />
                    </Suspense>     
                    
                    } /> 

                     {/* <Route path='/photos/:id/statistics' element={<ImageStats />} />  */}
           
                   <Route path='/photos/statistics' element={
                    <Suspense fallback={<PageLoader />}>
                    <ImageStats />
                    </Suspense>     
                    
                    } />  
            </Route>
         
        </Routes>
        </CustomErrorBoundary>
        
    )
}

export default Routing;