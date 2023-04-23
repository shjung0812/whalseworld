 
#!/bin/bash

#$read "Enter Password: " 
echo 'Enter Password: '

savefolder=savefolder`date +%Y%m%d`/
mkdir ${savefolder}
mysqldump -ushjung -p${mypassword} whalseworld > ${savefolder}/mysql.sql
tar -czpf ${savefolder}/saveWhole.`date +%Y%m%d%H%M%S`.tar.gz /home/ubuntu/whalseproject
#tar -czpf ${savefolder}/saveWithoutPublicFolder.`date +%Y%m%d%H%M%S`.tar.gz /home/morgan/web/cdct/bin /home/morgan/web/cdct/cdctapp.js /home/morgan/web/cdct/lib /home/morgan/web/cdct/prismpath.json /home/morgan/web/cdct/sessions /home/morgan/web/cdct/spam /home/morgan/web/cdct/views /home/morgan/web/cdct/log /home/morgan/web/cdct/keys
tar -czpf ${savefolder}/saveWithPublicFolder.`date +%Y%m%d%H%M%S`.tar.gz /home/morgan/web/cdct/public
