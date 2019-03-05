require('fs')
    .writeFileSync(
        `${__dirname}/../.rsa-keypair.json`, 
        JSON.stringify(
            require('generate-rsa-keypair')()
        )
    );