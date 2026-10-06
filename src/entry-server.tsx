import LearningLibrary from './pages/LearningLibrary';
import AnnuityEducation from './pages/AnnuityEducation';
import EstateChecklist from './pages/EstateChecklist';
import TaxPlanning from './pages/TaxPlanning';
import FederalPlanning from './pages/FederalPlanning';
import FederalResources from './pages/FederalResources';
import MilitaryRetirement from './pages/MilitaryRetirement';
/// <reference types="node" />
import Home from './pages/Home';
import PlanningTools from './pages/PlanningTools';
import ServicePage from './pages/ServicePage';
import TeamPage from './pages/TeamPage';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import type {HelmetServerState} from 'react-helmet-async';
import App from './App';
export async function render(url:string){
 const context:{helmet?:HelmetServerState}={};
 const body=renderToString(<StaticRouter location={url}><App helmetContext={context} pages={{LearningLibrary,AnnuityEducation,EstateChecklist,TaxPlanning,FederalPlanning,FederalResources,MilitaryRetirement,Home,PlanningTools,ServicePage,TeamPage}}/></StaticRouter>);
 const h=context.helmet;
 return {body,head:h?[h.title,h.meta,h.link,h.script].map(t=>t.toString()).join(''):''};
}
