let peer = null;
let conn = null;
let hosts = new Map(); // Store active hosts

// Initialize PeerJS
function initPeer(isHost) {
    peer = new Peer();
    
    peer.on('open', id => {
        if (isHost) {
            document.getElementById('hostId').textContent = id;
            registerHost(id);
        }
    });

    peer.on('connection', handleConnection);
    peer.on('error', handleError);
}

// Setup host mode
function setupHost() {
    document.getElementById('initialOptions').classList.add('hidden');
    document.getElementById('hostSection').classList.remove('hidden');
    initPeer(true);
}

// Setup join mode
function setupJoin() {
    document.getElementById('initialOptions').classList.add('hidden');
    document.getElementById('joinSection').classList.remove('hidden');
    initPeer(false);
    refreshHosts();
}

// Register host with the server
async function registerHost(hostId) {
    try {
        const response = await fetch('/api/hosts/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hostId })
        });
        if (!response.ok) throw new Error('Failed to register host');
    } catch (error) {
        console.error('Error registering host:', error);
        updateStatus('Failed to register as host', 'error');
    }
}

// Refresh available hosts
async function refreshHosts() {
    try {
        const response = await fetch('/api/hosts');
        if (!response.ok) throw new Error('Failed to fetch hosts');
        
        const hosts = await response.json();
        const hostList = document.getElementById('hostList');
        hostList.innerHTML = '';
        
        hosts.forEach(host => {
            const li = document.createElement('li');
            li.innerHTML = `
                Host: ${host.id}
                <button onclick="connectToHost('${host.id}')">Connect</button>
            `;
            hostList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching hosts:', error);
        updateStatus('Failed to fetch available hosts', 'error');
    }
}

// Connect to a host
function connectToHost(hostId) {
    updateStatus('Connecting...', 'connecting');
    conn = peer.connect(hostId);
    
    conn.on('open', () => {
        updateStatus('Connected! Waiting for host acceptance...', 'connecting');
        conn.send({
            type: 'connection-request',
            peerId: peer.id
        });
    });

    conn.on('data', handleData);
    conn.on('error', handleError);
}

// Handle incoming connection
function handleConnection(connection) {
    conn = connection;
    conn.on('data', handleData);
    
    // Show connection request
    const requestsDiv = document.getElementById('connectionRequests');
    const requestDiv = document.createElement('div');
    requestDiv.className = 'request';
    requestDiv.innerHTML = `
        Connection request from: ${connection.peer}
        <div class="request-buttons">
            <button onclick="acceptConnection('${connection.peer}')">Accept</button>
            <button onclick="rejectConnection('${connection.peer}')">Reject</button>
        </div>
    `;
    requestsDiv.appendChild(requestDiv);
}

// Accept connection request
function acceptConnection(peerId) {
    conn.send({
        type: 'connection-accepted'
    });
    updateStatus('Connected to ' + peerId, 'connected');
    document.getElementById('connectionRequests').innerHTML = '';
    //SHOULD START THE QUIZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
    window.location.href = 'http://localhost:4000/';
}

// Reject connection request
function rejectConnection(peerId) {
    conn.send({
        type: 'connection-rejected'
    });
    conn.close();
    document.getElementById('connectionRequests').innerHTML = '';
}

// Handle incoming data
function handleData(data) {
    if (data.type === 'connection-accepted') {
        updateStatus('Connection accepted!', 'connected');
        window.location.href = 'http://localhost:4000/';
    } else if (data.type === 'connection-rejected') {
        updateStatus('Connection rejected by host', 'error');
        conn.close();
    }
}

// Handle errors
function handleError(err) {
    console.error(err);
    updateStatus('Error: ' + err.message, 'error');
}

// Update status display
function updateStatus(message, type) {
    const statusDiv = document.getElementById('connectionStatus');
    statusDiv.textContent = message;
    statusDiv.className = `status-${type}`;
}