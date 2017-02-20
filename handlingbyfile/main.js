global.freeroam = {
//    commands: jcmp.events.Call('get_command_manager')[0],
//    chat: jcmp.events.Call('get_chat')[0],
//    config: require('./gm/config'),
    utils: require('../freeroam/gm/utility')
//    colours: require('./vendor/randomColor'),
//    workarounds: require('./gm/_workarounds'),
//    timeManager: new (require('./gm/timeManager'))(13, 0),
//    groupManager: new (require('./gm/groupManager'))()
};


// load all commands from the 'commands' directory
//freeroam.commands.loadFromDirectory(`${__dirname}/commands`, (f, ...a) => require(f)(...a));

// load all event files from the 'events' directory
freeroam.utils.loadFilesFromDirectory(`${__dirname}/events`);