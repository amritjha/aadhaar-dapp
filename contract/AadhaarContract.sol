pragma solidity ^0.5.0;

contract AadhaarContract { 

    struct Aadhaar {
        
        string name;
        int256 date_of_birth;
        uint8 gender;
        string residential_address;
        uint256 phone_no;
        string email_id;
        bytes32 iris_encoded;
        bytes32 fingerprints_encoded;
        bytes32 face_encoded;
        uint256 aadhaar_no;
        
    }
    
    struct Permission {
        
        address granted_by;
        address granted_to;
        uint256 duration;
        uint8 status;
        
    }
        
    mapping(address => uint256) addr_id_linkage;
    mapping(uint256 => Aadhaar) aadhaar_data;
    mapping(uint256 => Permission) permissions;
    mapping(address => bool) designated_agents;
    
    uint256 private aadhaar_no_init = 100000000000;
    uint256 private permission_no_init = 10000000;
    address private sys_regulator;
    
    event nodeDesignated(address node_addr);
    event nodeDeposed(address node_addr);
    event citizenRegistered(string name, uint256 aadhaar_no);
    
    event particularsUpdated(address node_addr);
    event permissionGranted(uint256 permid, address node_addr);
    event permissionRevoked(uint256 permid);
    
    constructor() public {
        sys_regulator = msg.sender;
    }
    
    function designateNode(address _addr) public {
        
        require(msg.sender == sys_regulator);
        designated_agents[_addr] = true;
        
        emit nodeDesignated(_addr);
    }
    
    function deposeNode(address _addr) public {
        
        require(msg.sender == sys_regulator);
        designated_agents[_addr] = false;
        
        emit nodeDeposed(_addr);
    }
    
    function addRecords(address _addr, string memory _nm, int256 _dob, uint8 _gn, string memory _resaddr, uint256 _ph, string memory _em, bytes32 _iris, bytes32 _fnprints, bytes32 _face) public {
        
        require(designated_agents[msg.sender] == true);
        
        aadhaar_data[aadhaar_no_init] = Aadhaar({
            name: _nm,
            date_of_birth: _dob,
            gender: _gn,
            residential_address: _resaddr,
            phone_no: _ph,
            email_id: _em,
            iris_encoded: _iris,
            fingerprints_encoded: _fnprints,
            face_encoded: _face,
            aadhaar_no: aadhaar_no_init
        });
        
        addr_id_linkage[_addr] = aadhaar_no_init;
        emit citizenRegistered(aadhaar_data[addr_id_linkage[_addr]].name, addr_id_linkage[_addr]);
        
        ++aadhaar_no_init;
    }
    
    function accessOwnRecords() public view returns (string memory, int256, uint8, string memory, uint256, string memory, bytes32, bytes32, bytes32, uint256) {
        
        return (
            aadhaar_data[addr_id_linkage[msg.sender]].name, 
            aadhaar_data[addr_id_linkage[msg.sender]].date_of_birth, 
            aadhaar_data[addr_id_linkage[msg.sender]].gender, 
            aadhaar_data[addr_id_linkage[msg.sender]].residential_address, 
            aadhaar_data[addr_id_linkage[msg.sender]].phone_no, 
            aadhaar_data[addr_id_linkage[msg.sender]].email_id, 
            aadhaar_data[addr_id_linkage[msg.sender]].iris_encoded, 
            aadhaar_data[addr_id_linkage[msg.sender]].fingerprints_encoded, 
            aadhaar_data[addr_id_linkage[msg.sender]].face_encoded,
            aadhaar_data[addr_id_linkage[msg.sender]].aadhaar_no
        );
        
    }
    
    function updateBiometricDetails(address _addr, bytes32 _iris, bytes32 _fnprints, bytes32 _face) public {
        
        require(designated_agents[msg.sender] == true);
        aadhaar_data[addr_id_linkage[_addr]].iris_encoded = _iris;
        aadhaar_data[addr_id_linkage[_addr]].fingerprints_encoded = _fnprints;
        aadhaar_data[addr_id_linkage[_addr]].face_encoded = _face;
        
        emit particularsUpdated(_addr);
    }
    
    function updateContactDetails(address _addr, string memory _resaddr, string memory _em, uint256 _ph) public {
        
        require(designated_agents[msg.sender] == true);
        aadhaar_data[addr_id_linkage[_addr]].residential_address = _resaddr;
        aadhaar_data[addr_id_linkage[_addr]].email_id = _em;
        aadhaar_data[addr_id_linkage[_addr]].phone_no = _ph;
        
        emit particularsUpdated(_addr);
    }
    
    function updatePersonalDetails(address _addr, string memory _nm, int256 _dob, uint8 _gn) public {
        
        require(designated_agents[msg.sender] == true);
        aadhaar_data[addr_id_linkage[_addr]].name = _nm;
        aadhaar_data[addr_id_linkage[_addr]].date_of_birth = _dob;
        aadhaar_data[addr_id_linkage[_addr]].gender = _gn;
        
        emit particularsUpdated(_addr);
    }
    
    function grantAccess(address _rcv, uint256 _dr) public {
        
        permissions[permission_no_init] = Permission({
            granted_by: msg.sender,
            granted_to: _rcv,
            duration: now + _dr,
            status: 1
        });
        
        emit permissionGranted(permission_no_init, permissions[permission_no_init].granted_to);
        
        ++permission_no_init;
    }
    
    function revokeAccess(uint256 _permid) public {
        
        require(msg.sender == permissions[_permid].granted_by && now <= permissions[_permid].duration);
        permissions[_permid].status = 0;
        
        emit permissionRevoked(_permid);
    }
    
    function accessOthersRecords(uint256 _permid) view public returns(string memory, int256, uint8, string memory, uint256, string memory, bytes32) {
        
        require(msg.sender == permissions[_permid].granted_to && permissions[_permid].status != 0);
        require(now <= permissions[_permid].duration);
        uint256 aadhaar = addr_id_linkage[permissions[_permid].granted_by];
        
        return (
        
            aadhaar_data[aadhaar].name, 
            aadhaar_data[aadhaar].date_of_birth, 
            aadhaar_data[aadhaar].gender, 
            aadhaar_data[aadhaar].residential_address, 
            aadhaar_data[aadhaar].phone_no, 
            aadhaar_data[aadhaar].email_id,
            aadhaar_data[aadhaar].face_encoded
        );
        
    }
    
}