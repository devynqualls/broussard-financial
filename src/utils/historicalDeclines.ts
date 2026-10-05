// Yardeni Research, BullBearTables.pdf, January 21, 2024, pages 4–6.
const events = ['Wall Street crash of 1929','Great Depression: deepening downturn','Great Depression: banking crisis','Great Depression: 1933 reversal','Great Depression: 1934–35 downturn','Recession of 1937–38','Prewar market downturn','World War II: war in Europe','World War II: early U.S. involvement','Postwar market adjustment','Recession of 1948–49','Recession of 1957–58','1962 market crash','1966 market downturn','1969–70 recession-era bear market','Oil crisis and stagflation','Inflation fight and 1981–82 recession','Black Monday crash','Gulf crisis and 1990 recession','Russian debt crisis and global financial stress','Dot-com bust','Global financial crisis','U.S. debt downgrade and European debt concerns','Rate increases and trade tensions','COVID-19 pandemic crash','Inflation and interest-rate increases'];
export const historicalDeclines = [
['09/07/1929','11/13/1929',44.7],['04/10/1930','06/01/1932',83],['09/07/1932','02/27/1933',40.6],['07/18/1933','10/21/1933',29.8],['02/06/1934','03/14/1935',31.8],['03/06/1937','03/31/1938',54.5],['11/09/1938','04/08/1939',26.2],['10/25/1939','06/10/1940',31.9],['11/09/1940','04/28/1942',34.5],['05/29/1946','10/09/1946',26.6],['06/15/1948','06/13/1949',20.6],['07/15/1957','10/22/1957',20.7],['12/12/1961','06/26/1962',28],['02/09/1966','10/07/1966',22.2],['11/29/1968','05/26/1970',36.1],['01/11/1973','10/03/1974',48.2],['11/28/1980','08/12/1982',27.1],['08/25/1987','12/04/1987',33.5],['07/16/1990','10/11/1990',19.9],['07/17/1998','08/31/1998',19.3],['03/24/2000','10/09/2002',49.1],['10/09/2007','03/09/2009',56.8],['04/29/2011','10/03/2011',19.4],['09/20/2018','12/24/2018',19.8],['02/19/2020','03/23/2020',33.9],['01/03/2022','10/12/2022',25.4]
].map(([peak,trough,loss],index)=>({peak:String(peak),trough:String(trough),loss:Number(loss),event:events[index]})).reverse();

// Feature familiar investing-era events; the remaining history stays newest first.
const featuredPeaks = ['10/09/2007', '03/24/2000', '02/19/2020'];
historicalDeclines.sort((a,b) => {
  const aRank = featuredPeaks.indexOf(a.peak);
  const bRank = featuredPeaks.indexOf(b.peak);
  return (aRank < 0 ? 3 : aRank) - (bRank < 0 ? 3 : bRank);
});
