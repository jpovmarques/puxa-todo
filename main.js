const menubar = require('menubar')

const options = {
  height:165,
  width:300,
  resizable: false,
}

const mb = menubar(options);

mb.on('ready', function ready () {
  item = mb.tray;
})

const updateTitle = (item, text) => {
  item.setTitle(text);
}
