import {Helmet} from 'react-helmet-async';
import {Link, useLocation} from 'react-router-dom';

const labels:Record<string,string>={
 '/team':'Our team', '/planning-tools':'Retirement planning tools',
 '/federal-planning':'Federal retirement planning', '/federal-resources':'Federal employee resources',
 '/military-retirement':'Military retirement & TSP',
 '/tax-planning':'Tax planning', '/estate-planning-checklist':'Estate planning checklist',
 '/annuity-education':'Annuity education', '/learning-library':'Learning library',
 '/services/trust-reviews':'Estate planning & trust services', '/services/annuities':'Annuity reviews',
 '/services/life-insurance':'Life insurance', '/services/real-estate':'Real estate',
 '/services/retirement-income':'Retirement income planning',
 '/services/federal-retirement':'Federal employee retirement planning', '/services/tsp-planning':'TSP planning',
};
export default function Breadcrumbs(){
 const {pathname}=useLocation();
 const label=labels[pathname.replace(/\/$/,'')];
 if(!label)return null;
 const items=[{name:'Home',path:'/'}];
 if(['/estate-planning-checklist','/annuity-education','/military-retirement'].includes(pathname))items.push({name:'Learning library',path:'/learning-library'});
 items.push({name:label,path:pathname});
 const schema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:'https://www.broussardfinancialservices.com'+item.path}))};
 return <><Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet><nav aria-label="Breadcrumb" style={{maxWidth:1120,margin:'0 auto',padding:'24px 24px 0',fontSize:'0.9rem'}}><ol style={{display:'flex',flexWrap:'wrap',gap:'0.5rem',listStyle:'none',padding:0,margin:0}}>{items.map((item,index)=><li key={item.path}>{index>0&&<span aria-hidden="true"> / </span>}{index===items.length-1?<span aria-current="page">{item.name}</span>:<Link to={item.path}>{item.name}</Link>}</li>)}</ol></nav></>;
}
