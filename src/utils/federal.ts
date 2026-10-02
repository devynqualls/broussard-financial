export function mraMonths(year:number){return year<1948?660:year<=1952?660+(year-1947)*2:year<=1964?672:year<=1969?672+(year-1964)*2:684;}
export function eligibility(birthYear:number,ageMonths:number,serviceMonths:number){
 if(ageMonths>=744&&serviceMonths>=60||ageMonths>=720&&serviceMonths>=240||ageMonths>=mraMonths(birthYear)&&serviceMonths>=360)return {label:'Potential unreduced immediate retirement',reduction:0,eligible:true};
 if(ageMonths>=mraMonths(birthYear)&&serviceMonths>=120)return {label:'Potential MRA + 10 retirement with an age reduction',reduction:Math.max(0,744-ageMonths)/240,eligible:true};
 return {label:'Standard immediate retirement requirements not met',reduction:0,eligible:false};
}
export function pension(high3:number,serviceMonths:number,ageMonths:number,reduction:number,survivor:number){const factor=ageMonths>=744&&serviceMonths>=240?.011:.01;const base=high3*serviceMonths/12*factor*(1-reduction)/12;return {base,monthly:base*(survivor===50?.9:survivor===25?.95:1),survivor:base*survivor/100,factor};}
export function paycheck(pension:number,tsp:number,social:number,other:number,taxes:number,insurance:number,expenses:number){const gross=pension+tsp+social+other;return {gross,net:gross-taxes-insurance,remaining:gross-taxes-insurance-expenses};}

