{
  "targets": [
    {
      "target_name": "pcap_binding",
      "sources": [ "pcap_binding.cc", "pcap_session.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ],
      "link_settings": {
          "libraries": [
              "-lpcap"
          ]
      }
    },
    {
      "target_name": "action_after_build",
      "type": "none",
      "dependencies": [ "pcap_binding" ],
      "copies": [ {
        "files": [ "<(PRODUCT_DIR)/pcap_binding.node" ],
        "destination": "out",
      } ],
    }
  ]
}
