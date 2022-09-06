import './App.css';
import './style.css';
import SiteHeader from './components/Site/SiteHeader';
import { useState } from 'react';
import SiteHome from './components/Site/SiteHome';
import ViewClaims from './components/Claim/ViewClaims';
import ClaimSearch from './components/Claim/ClaimSearch';
import SiteFooter from './components/Site/SiteFooter';
import ClaimDetails from './components/Claim/ClaimDetails';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import claimsStore from './store/store';
import { Provider } from 'react-redux';

function App() {

  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("claimNumber");

  return (<Provider store={claimsStore}>
            <BrowserRouter>
              <div className="App">
                <SiteHeader setSearchText={setSearchText} setSearchType={setSearchType} searchText={searchText} />
                <Routes>
                  <Route path="/" element={<SiteHome />} />
                  <Route path="new" element={<ClaimDetails />} /> 
                  <Route path="view/:claimId" element={<ClaimDetails />} />
                  <Route path="list" element={<ViewClaims/>} />
                  <Route path="Search" element={<ClaimSearch searchType={searchType} searchText={searchText}  />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
                <SiteFooter year={new Date().getFullYear()}
                 />               
               </div>
            </BrowserRouter>
          </Provider>
  );
}

export default App;