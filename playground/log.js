const log = require('../icon-log/icon-log');

log.info('info', 'info');
console.log(require('log-symbols').info, 'info', 'info');
log.success('success');
log.warning('warning');
log.error('error');
