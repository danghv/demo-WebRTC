const Peer = require('simple-peer')
const $ = require('jquery')
const playVideo = require('./playVideo')
const openStream = require('./openStream')
openStream(function(stream) {
    playVideo(stream, 'localStream');
    const p = new Peer({ initiator: location.hash === '#1', trickle: false, stream:stream })
    p.on('signal', token =>{
        $('#txtMySignal').val(JSON.stringify(token))
    })
    $('#btnConnect').click(() => {
        const friendSignal = JSON.parse($('#txtFriendSignal').val());
        p.signal(friendSignal)
    })
    p.on('stream', friendStream => playVideo(friendStream, 'friendStream'))
});