pragma solidity ^0.4.24;

contract AadhaarContract {
    
    struct Aadhaar {
        
        string name;
        int256 date_of_birth;
        uint8 gender;
        string residential_address;
        uint256 phone_no;
        string email_id;
        uint256 iris_encoded;
        uint256 fingerprints_encoded;
        uint256 face_encoded;
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
    
    constructor() public {
        sys_regulator = msg.sender;
    }
    
    function designateNode(address _addr) public {
        
        require(msg.sender == sys_regulator);
        designated_agents[_addr] = true;
    
    }
    
    function deposeNode(address _addr) public {
        
        require(msg.sender == sys_regulator);
        designated_agents[_addr] = false;
    
    }
    
    function addRecords(address _addr, string _nm, int256 _dob, uint8 _gn, string _resaddr, uint256 _ph, string _em, uint256 _iris, uint256 _fnprints, uint256 _face) public {
        
        require(designated_agents[msg.sender] == true);
        
        aadhaar_data[++aadhaar_no_init] = Aadhaar({
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
    
    }
    
    function grantAccess(address _rcv, uint256 _dr) public {
        
        permissions[++permission_no_init] = Permission({
            granted_by: msg.sender,
            granted_to: _rcv,
            duration: _dr,
            status: 1
        });

    }
    
    function revokeAccess(uint256 _permid) public {
        
        require(msg.sender == permissions[_permid].granted_by && now <= permissions[_permid].duration);
        permissions[_permid].status = 0;
        
    }
    
    function accessOwnRecords() public view returns (string, int256, uint8, string, uint256, string, uint256, uint256, uint256, uint256) {
        
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
    
    function accessOthersRecords(uint256 _permid) view public returns(string, int256, uint8, string, uint256) {
        
        require(msg.sender == permissions[_permid].granted_to && permissions[_permid].status != 0);
        require(now <= permissions[_permid].duration);
        
        return (
            aadhaar_data[addr_id_linkage[permissions[_permid].granted_by]].name, 
            aadhaar_data[addr_id_linkage[permissions[_permid].granted_by]].date_of_birth, 
            aadhaar_data[addr_id_linkage[permissions[_permid].granted_by]].gender, 
            aadhaar_data[addr_id_linkage[permissions[_permid].granted_by]].residential_address, 
            aadhaar_data[addr_id_linkage[permissions[_permid].granted_by]].face_encoded
        );
        
    }
    
    function updateBiometricDetails(address _addr, uint256 _iris, uint256 _fnprints, uint256 _face) public {
        
        require(designated_agents[msg.sender] == true);
        aadhaar_data[addr_id_linkage[_addr]].iris_encoded = _iris;
        aadhaar_data[addr_id_linkage[_addr]].fingerprints_encoded = _fnprints;
        aadhaar_data[addr_id_linkage[_addr]].face_encoded = _face;
        
    }
    
    function updateContactDetails(address _addr, string _resaddr, string _em, uint256 _ph) public {
        
        require(designated_agents[msg.sender] == true);
        aadhaar_data[addr_id_linkage[_addr]].residential_address = _resaddr;
        aadhaar_data[addr_id_linkage[_addr]].email_id = _em;
        aadhaar_data[addr_id_linkage[_addr]].phone_no = _ph;
        
    }
    
    function updatePersonalDetails(address _addr, string _nm, int256 _dob, uint8 _gn) public {
        
        require(designated_agents[msg.sender] == true);
        aadhaar_data[addr_id_linkage[_addr]].name = _nm;
        aadhaar_data[addr_id_linkage[_addr]].date_of_birth = _dob;
        aadhaar_data[addr_id_linkage[_addr]].gender = _gn;
        
    }
    
    
}