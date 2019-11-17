//Default Namespace 
    /**
     * default namespace is '/' and its the one socket.io client connect to by default
     * 
     * Each Namespace emits a connection event that receives each Socket instances as a parameter.
     * 
     *
     * 
     * #Custom Namespaces : 
     *         To setup custom namespaces you can call the of function of server-side:
     *         const nsp = io.of('/my-namespace');
     *               nsp.on('connection', function(socket){
     *               console.log('Someone Connected);
     *          });
     * 
     */