const menubar = require('menubar')

const options = {
  height:158,
  width:300,
}

const mb = menubar(options);

mb.on('ready', function ready () {
  console.log('app ready');
  item = mb.tray;
})

mb.on('after-create-window', () => {
  mb.window.openDevTools();
})

const updateTitle = (item, text) => {
  item.setTitle(text);
}
