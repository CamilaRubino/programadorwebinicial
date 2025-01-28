const moment = require ('moment');
moment.locale('es'); 
console.log('Naci ' + moment('06/10/1997','DD/MM/YYYY').fromNow());
