export function mraMonths(year:number){return year<1948?660:year<=1952?660+(year-1947)*2:year<=1964?672:year<=1969?672+(year-1964)*2:684;}
export function eligibility(birthYear:number,ageMonths:number,serviceMonths:number){
 if(ageMonths>=744&&serviceMonths>=60||ageMonths>=720&&serviceMonths>=240||ageMonths>=mraMonths(birthYear)&&serviceMonths>=360)return {label:'Potential unreduced immediate retirement',reduction:0,eligible:true};
 if(ageMonths>=mraMonths(birthYear)&&serviceMonths>=120)return {label:'Potential MRA + 10 retirement with an age reduction',reduction:Math.max(0,744-ageMonths)/240,eligible:true};
 return {label:'Standard immediate retirement requirements not met',reduction:0,eligible:false};
}
export function pension(high3:number,serviceMonths:number,ageMonths:number,reduction:number,survivor:number){const factor=ageMonths>=744&&serviceMonths>=240?.011:.01;const base=high3*serviceMonths/12*factor*(1-reduction)/12;return {base,monthly:base*(survivor===50?.9:survivor===25?.95:1),survivor:base*survivor/100,factor};}
export function paycheck(pension:number,tsp:number,social:number,other:number,taxes:number,insurance:number,expenses:number){const gross=pension+tsp+social+other;return {gross,net:gross-taxes-insurance,remaining:gross-taxes-insurance-expenses};}
export const retirementCategories=[['regular','Regular FERS'],['atc','Air traffic controller'],['leo','Law enforcement officer / Border Patrol agent'],['fire','Firefighter'],['capitol','Capitol Police'],['supreme','Supreme Court Police'],['courier','Nuclear materials courier'],['cbpo','Customs and Border Protection officer'],['review','Military reserve technician / other special coverage']] as const;
export function specialEligibility(ageMonths:number,totalMonths:number,coveredMonths:number){
 const valid=Number.isInteger(coveredMonths)&&coveredMonths>=0&&coveredMonths<=totalMonths;
 const eligible=valid&&(coveredMonths>=300||(ageMonths>=600&&coveredMonths>=240));
 return {eligible,reduction:0,label:!valid?'Covered service cannot exceed total creditable service':eligible?'Potential unreduced special-provisions retirement':'Special-provisions threshold not met: age 50 with 20 covered years, or any age with 25 covered years'};
}
export function specialPension(high3:number,serviceMonths:number,survivor:number){
 const base=high3*(Math.min(serviceMonths,240)/12*.017+Math.max(0,serviceMonths-240)/12*.01)/12;
 return {base,monthly:base*(survivor===50?.9:survivor===25?.95:1),survivor:base*survivor/100};
}

