declare var describe, test, expect, require, process;

import mail from '../mail';

test('sendMail method', ()=>{

    mail.send({
        to: '',
        toName: '',
        subject: '',
        body: 'Hello world'
    })
});
