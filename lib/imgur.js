module.exports = {
  'upload': async _0x1046f3 => {
    const {
      ImgurClient: _0x13ccf9
    } = require("imgur");
    const _0x2e32c6 = new _0x13ccf9({
      'clientId': "60c1814e1fa10c8"
    });
    const _0x48dea3 = await _0x2e32c6.upload({
      'image': require('fs').createReadStream(_0x1046f3),
      'type': "stream"
    });
    return _0x48dea3.data;
  }
};
