//Set attribute values for DOM manipulation
function setAttr(val1, val2, element) {
    for (var i = 0; i < val1.length; i++) {
        element.setAttribute(val1[i], val2[i]);
    }
}

let contentBody = document.getElementById('content-body');
let welcometext = document.getElementById('welcome-text');

//Click to load welcome page
document.getElementById('freshDesk-logo').onclick = () => {
    contentBody.innerHTML = '';
    contentBody.append(welcometext);
}

//Returns string values for Priority Numbers
var priority = (number) => {
    switch (number) {
        case 1:
            return 'Low';
        case 2:
            return 'Medium';
        case 3:
            return 'High';
        case 4:
            return 'Urgent';
    }
}

//Returns string values for Status Numbers
var status = (number) => {
    switch (number) {
        case 2:
            return 'Open';
        case 3:
            return 'Pending';
        case 4:
            return 'Resolved';
        case 5:
            return 'Closed';
    }
}

//Create a ticket
document.getElementById('create-ticket').onclick = () => {
    contentBody.innerHTML = '';
    contentBody.innerHTML = `
    <div class='container-fluid mt-3'>
        <form class='text-left' id='create-ticket-form'>
            <div class='row'>
                <div class='col-lg-12 col-md-12 col-sm-12'>
                    <div class="form-group">
                        <label for="requester_id">Requester ID<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <input type="number" class="form-control" id="requester_id" aria-describedby="reqId-create-ticket" name="requester_id" placeholder="Enter ID of requester" required>
                        <small id="reqId-create-ticket" class="form-text text-muted">If no requester Id exists, please Create Contact</small>
                    </div>
                </div>
            </div>


            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                    <label for="type">Type<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                    <select class="form-control" id="type" name="type" required>
                        <option value=null>--</option>
                        <option value='Question'>Question</option>
                        <option value='Incident'>Incident</option>
                        <option value='Problem'>Problem</option>
                        <option value='Feature Request'>Feature Request</option>
                        <option value='Refunds and Returns'>Refunds and Returns</option>
                        <option value='Bulk Orders'>Bulk Orders</option>
                        <option value='Refund'>Refund</option>
                    </select>
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="subject">Subject<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <input type="text" class="form-control" id="subject" name="subject" placeholder="Enter Subject" required>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                    <label for="priority">Priority<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                    <select class="form-control" id="priority" name="priority" required>
                        <option value=null>--</option>
                        <option value='1'>Low</option>
                        <option value='2'>Medium</option>
                        <option value='3'>High</option>
                        <option value='4'>Urgent</option>
                    </select>
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="status">Status<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <select class="form-control" id="status" name="status" required>
                            <option value=null>--</option>
                            <option value='2'>Open</option>
                            <option value='3'>Pending</option>
                            <option value='4'>Resolved</option>
                            <option value='5'>Closed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-12 col-md-12 col-sm-12'>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" name='description' id="description" rows="3" placeholder='Please describe your query'></textarea>
                        <small style='color:red;' class='font-italic'>* Required field(s)</small>
                    </div>
                </div>
                <div class='col-lg-12 col-md-12 col-sm-12'>
                    <div class="form-group">
                    <input type="number" class="form-control" id="responder_id" name="responder_id" hidden value='82011503395'>
                    </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-success btn-lg btn-block">Save Ticket</button>

        </form>
    </div>
    `

    let createTicketForm = document.getElementById('create-ticket-form');

    createTicketForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        try {

            let req = await fetch('https://helpishere.freshdesk.com/api/v2/tickets', { method: 'post', body: formData, headers: { Authorization: 'Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA==' } });
            if (req.status == 400) { throw new Error('Invalid Input') }
            alert('Ticket successfully created');
            location.reload();
        } catch (err) {
            alert('Invalid input, please enter correct details');
            console.error(err);
        }
    })
}

//List tickets
document.getElementById('list-ticket').onclick = async() => {
    contentBody.innerHTML = '';

    const displayTickets = (arr) => {
        arr.forEach(el => {
            let card = document.createElement('div');
            setAttr(['class', 'style'], ['card mt-3 text-left', 'width:100%;'], card);
            let created = new Date(el.created_at);
            let frdue = new Date(el.fr_due_by);

            card.innerHTML = `
                <div class="card-header"><h5 class='card-title'>${el.subject}</h5></div>
                <div class="card-body">
                    <div class='row d-flex flex-row justify-content-between align-items-end'>
                        <div class='order-0 col-lg-4 col-md-4 col-sm-12'>
                            <p class='card-text pb-0 mb-0'><strong>ID:</strong> ${el.id}</p>
                            <p class="card-text pb-0 mb-0"><strong>Created:</strong> ${created.getHours()}:${created.getMinutes()} ${created.getDate()}-${created.getMonth()}-${created.getFullYear()}</p>
                            <p class="card-text pb-0 mb-0"><strong>First Response Due by:</strong> ${frdue.getHours()}:${frdue.getMinutes()} ${frdue.getDate()}-${frdue.getMonth()}-${frdue.getFullYear()}</p>
                            </div>
                        <div class='order-1 col-lg-4 col-md-4 col-sm-12'>
                            <p class='card-text pb-0 mb-0 font-weight-bold'><span class="badge badge-warning">Priority:</span> ${priority(el.priority)}</p>
                            <p class='card-text pb-0 mb-0 font-weight-bold'><span class="badge badge-dark">Agent ID:</span> ${el.responder_id}</p>
                            <p class='card-text pb-0 mb-0 font-weight-bold'><span class="badge badge-primary">Status:</span> ${status(el.status)}</p>
                        </div>
                    </div>
                </div>
            `
            contentBody.append(card);
        });
    }

    try {

        let req = await fetch('https://helpishere.freshdesk.com/api/v2/tickets', { method: 'get', headers: { Authorization: 'Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA==' } });
        let res = await req.json();
        displayTickets(res);
    } catch (err) {
        console.error(err);
    }

}

//Delete Ticket
document.getElementById('delete-ticket').onclick = async() => {
    contentBody.innerHTML = '';
    contentBody.innerHTML = `
        <div class='text-left' style='width:100%;'>
            <p style='font-size:1.5rem;' class='mb-4 font-weight-bold'>Enter the ID of the ticket you want to delete<small style='color:red;' class='font-weight-bold font-italic'> *</small></p>
            <form id='ticket-delete-form'>
                <div class='row'>
                    <div class='col-lg-8 col-md-8 col-sm-12'>
                        <div class="form-group d-flex flex-column justify-content-start align-items-start text-left">
                            <input type="number" class="form-control" id="delete_ticket" placeholder='Ex: 14' required>
                            <small style='color:red;' class='font-italic'>* Required field(s)</small>
                         </div>
                    </div>

                    <div class='col-lg-4 col-md-4 col-sm-12'>
                        <button type="submit" class="btn btn-danger btn-block">Submit</button>
                    </div>

                </div>
                
            </form>
        </div>   
    `;

    let deleteTicket = document.getElementById('delete_ticket');

    document.getElementById('ticket-delete-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        try {

            let req = await fetch(`https://helpishere.freshdesk.com/api/v2/tickets/${deleteTicket.value}`, { method: 'delete', headers: { Authorization: 'Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA==' } });
            if (req.status == 404) { throw new Error('Invaid input'); }
            alert('Ticket successfully deleted');
            location.reload();
        } catch (err) {
            alert('Invalid input, please enter correct details');
            //console.error(err);
        }
    })


}


//Update a ticket
document.getElementById('update-ticket').onclick = () => {
    contentBody.innerHTML = '';
    contentBody.innerHTML = `
    <div class='container-fluid mt-3'>

        <form class='text-left'>
            <div class='row'>
                    <div class='col-lg-12 col-md-12 col-sm-12'>
                        <div class="form-group">
                            <label for="ticket_update_id">Ticket ID<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                            <input type="number" class="form-control" id="ticket_update_id" aria-describedby="ticketId-update-ticket" name="ticket_update_id" placeholder="Enter Ticket Id to be updated" required>
                            <small id="ticketId-update-ticket" class="form-text text-muted">If no such Ticket Id exists, please Create Ticket</small>
                        </div>
                    </div>
            </div>
        </form>
        <form class='text-left' id='update-ticket-form'>

            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                    <label for="type">Type</label>
                    <select class="form-control" id="type" name="type">
                        <option value=null>--</option>
                        <option value='Question'>Question</option>
                        <option value='Incident'>Incident</option>
                        <option value='Problem'>Problem</option>
                        <option value='Feature Request'>Feature Request</option>
                        <option value='Refunds and Returns'>Refunds and Returns</option>
                        <option value='Bulk Orders'>Bulk Orders</option>
                        <option value='Refund'>Refund</option>
                    </select>
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" class="form-control" aria-describedby="subject-update-ticket" id="subject" name="subject" placeholder="Enter Subject">
                        <small id="subject-update-ticket" class="form-text text-muted">If no changes in subject, enter current subject</small>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                    <label for="priority">Priority</label>
                    <select class="form-control" id="priority" name="priority">
                        <option value=null>--</option>
                        <option value='1'>Low</option>
                        <option value='2'>Medium</option>
                        <option value='3'>High</option>
                        <option value='4'>Urgent</option>
                    </select>
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select class="form-control" id="status" name="status">
                            <option value=null>--</option>
                            <option value='2'>Open</option>
                            <option value='3'>Pending</option>
                            <option value='4'>Resolved</option>
                            <option value='5'>Closed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-12 col-md-12 col-sm-12'>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" aria-describedby="description-update-ticket" name='description' id="description" rows="3" placeholder='Please describe your query'></textarea>
                        <small id="description-update-ticket" class="form-text text-muted">If no changes in description, enter current description</small>
                        <small style='color:red;' class='font-italic'>* Required field(s)</small>
                    </div>
                </div>
                <div class='col-lg-12 col-md-12 col-sm-12'>
                    <div class="form-group">
                        <input type="number" class="form-control" id="responder_id" name="responder_id" hidden value='82011503395'>
                    </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-success btn-lg btn-block">Save Ticket</button>

        </form>
    </div>
    `

    let updateTicketForm = document.getElementById('update-ticket-form');
    let ticketUpdateId = document.getElementById('ticket_update_id');

    updateTicketForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        try {

            let req = await fetch(`https://helpishere.freshdesk.com/api/v2/tickets/${ticketUpdateId.value}`, { method: 'put', body: formData, headers: { Authorization: 'Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA==' } });
            if (req.status == 404 || req.status == 400) {
                throw new Error('Invalid Input');
            }
            alert('Ticket successfully updated');
            location.reload();
        } catch (err) {
            alert('Invalid input, please enter correct details');
            //console.error(err);
        }
    })
}


//=================================================================================================================
//CONTACTS

//Create a contact
document.getElementById('create-contact').onclick = () => {
    contentBody.innerHTML = '';
    contentBody.innerHTML = `
    <div class='container-fluid mt-3'>
        <form class='text-left' id='create-contact-form'>

            <div class='row'>
                <div class='col-lg-12 col-md-12 col-sm-12'>
                    <div class="form-group">
                        <label for="name">Name<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name" required>
                </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="twitter_id">Twitter ID<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <input type="string" class="form-control" id="twitter_id" name="twitter_id" placeholder="Enter Twitter Id" required>
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="email">Email ID<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email Id" required>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="phone">Phone<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <input type="number" class="form-control" id="phone" name="phone" placeholder="Enter Phone" required>
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="mobile">Mobile<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <input type="number" class="form-control" id="mobile" name="mobile" placeholder="Enter Mobile" required>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea type="string" class="form-control" id="address" name="address" rows='3' placeholder="Enter Address"></textarea>
                        <small style='color:red;' class='font-italic'>* Required field(s)</small>
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea type="string" class="form-control" id="description" name="description" rows='3' placeholder="Enter Description"></textarea>
                    </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-success btn-lg btn-block">Save Contact</button>

        </form>
    </div>
    `;

    let createContactForm = document.getElementById('create-contact-form');

    createContactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        try {

            let req = await fetch('https://helpishere.freshdesk.com/api/v2/contacts', { method: 'POST', body: formData, headers: { Authorization: 'Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA==' } });
            if (req.status == 409) { throw new Error('Duplicate Value'); }
            alert('Contact successfully created');
            //location.reload();
        } catch (err) {
            if (err.message == 'Duplicate Value') { alert('Duplicate Value'); } else { alert('Invalid input, please enter correct details'); }
            //console.error(err);
        }
    })
}


//Update a Contact
document.getElementById('update-contact').onclick = () => {
    contentBody.innerHTML = '';
    contentBody.innerHTML = `
    <div class='container-fluid mt-3'>

        <form class='text-left'>
            <div class='row'>
            <div class='col-lg-12 col-md-12 col-sm-12'>
                <div class="form-group">
                    <label for="contact_update_id">Contact ID<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                    <input type="number" class="form-control" id="contact_update_id" aria-describedby="contactId-update-contact" name="contact_update_id" placeholder="Enter Contact Id to be updated" required>
                    <small id="contactId-update-contact" class="form-text text-muted">If no such Contact Id exists, please Create Contact</small>
                </div>
            </div>
        </div>
        </form>
        <form class='text-left' id='update-contact-form'>

            <div class='row'>
                <div class='col-lg-12 col-md-12 col-sm-12'>
                    <div class="form-group">
                        <label for="name">Name<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <input type="text" class="form-control" aria-describedby="name-update-contact" id="name" name="name" placeholder="Enter Name">
                        <small id="name-update-contact" class="form-text text-muted">If no changes in name, enter current name</small>
                </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="twitter_id">Twitter ID</label>
                        <input type="string" class="form-control" id="twitter_id" name="twitter_id" placeholder="Enter Twitter Id">
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="email">Email ID<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>
                        <input type="email" class="form-control" aria-describedby="email-update-contact" id="email" name="email" placeholder="Enter Email Id">
                        <small id="email-update-contact" class="form-text text-muted">If no changes in email, enter current email</small>
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="number" class="form-control" id="phone" name="phone" placeholder="Enter Phone">
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="mobile">Mobile</label>
                        <input type="number" class="form-control" id="mobile" name="mobile" placeholder="Enter Mobile">
                    </div>
                </div>
            </div>

            <div class='row'>
                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="address">Address</label>
                        <textarea type="string" class="form-control" id="address" name="address" rows='3' placeholder="Enter Address"></textarea>
                        <small style='color:red;' class='font-italic'>* Required field(s)</small>
                    </div>
                </div>
                <div class='col-lg-6 col-md-6 col-sm-12'>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea type="string" class="form-control" id="description" name="description" rows='3' placeholder="Enter Description"></textarea>
                    </div>
                </div>
            </div>
            
            <button type="submit" class="btn btn-success btn-lg btn-block">Save Contact</button>

        </form>
    </div>
    `

    let updateContactForm = document.getElementById('update-contact-form');
    let updateContactId = document.getElementById('contact_update_id');

    updateContactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        try {

            let req = await fetch(`https://helpishere.freshdesk.com/api/v2/contacts/${updateContactId.value}`, { method: 'put', body: formData, headers: { Authorization: 'Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA==' } });
            if (req.status == 404) {
                throw new Error('Invalid Input');
            } else if (req.status == 409) { throw new Error('Duplicate Value'); }
            alert('Contact successfully updated');
            location.reload();
        } catch (err) {
            if (err.message == 'Duplicate Value') { alert('Duplicate value'); } else { alert('Invalid input, please enter correct details'); }
            //console.error(err);
        }
    })
}

//List Contacts
document.getElementById('list-contact').onclick = async() => {
    contentBody.innerHTML = '';

    const displayDash = (value) => {
        if (value === null) { return '--' }
        return value;
    }

    const displayContacts = (arr) => {
        let tablediv = document.createElement('div');
        setAttr(['class'], ['table-responsive'], tablediv);
        let table = document.createElement('table');
        setAttr(['class'], ['table'], table);
        tablediv.append(table);
        contentBody.append(tablediv);
        let thead = document.createElement('thead');
        thead.className = 'table-success';
        table.append(thead);
        let theadrow = document.createElement('tr');
        thead.append(theadrow);
        thead.innerHTML = `
            <th scope="col">ID</th>
            <th scope="col">Contact</th>
            <th scope="col">Title</th>
            <th scope="col">Company</th>
            <th scope="col">Email Address</th>
            <th scope="col">Work Phone</th>
            <th scope="col">Facebook ID</th>
            <th scope="col">Twitter ID</th>
        `
        let tbody = document.createElement('tbody');
        table.append(tbody);
        arr.forEach((el) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <th scope="row">${el.id}</th>
                <td>${el.name}</td>
                <td>${displayDash(el.job_title)}</td>
                <td>${displayDash(el.company_id)}</td>
                <td>${el.email}</td>
                <td>${displayDash(el.phone)}</td>
                <td>${displayDash(el.facebook_id)}</td>
                <td>${displayDash(el.twitter_id)}</td>
            `
            tbody.append(row);
        })
    }

    try {

        let req = await fetch('https://helpishere.freshdesk.com/api/v2/contacts', { method: 'get', headers: { Authorization: 'Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA==' } });
        let res = await req.json();
        displayContacts(res);
    } catch (err) {
        console.error(err);
    }
}

//Delete a contact
document.getElementById('delete-contact').onclick = async() => {
    contentBody.innerHTML = '';
    contentBody.innerHTML = `
        <div class='text-left' style='width:100%;'>
            <p style='font-size:1.5rem;' class='mb-4 font-weight-bold'>Enter the ID of the contact you want to delete<small style='color:red;' class='font-weight-bold font-italic'> *</small></p>
            <form id='delete-contact-form'>
                <div class='row'>
                    <div class='col-lg-8 col-md-8 col-sm-12'>
                        <div class="form-group d-flex flex-column justify-content-start align-items-start text-left">
                            <input type="number" class="form-control" id="delete_contact" placeholder='Ex: 12345678912' required>
                            <small style='color:red;' class='font-italic'>* Required field(s)</small>
                         </div>
                    </div>

                    <div class='col-lg-4 col-md-4 col-sm-12'>
                        <button type="submit" class="btn btn-danger btn-block">Submit</button>
                    </div>
                </div>
                
            </form>
        </div>   
    `;

    let deleteContact = document.getElementById('delete_contact');

    document.getElementById('delete-contact-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        try {
            let req = await fetch(`https://helpishere.freshdesk.com/api/v2/contacts/${deleteContact.value}`, { method: 'DELETE', headers: { Authorization: 'Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA==' } });
            if (req.status == 404) {
                throw 'Invalid input';
            }
            alert('Contact successfully deleted');
            location.reload();
        } catch (err) {
            alert('Invalid input, please enter correct details');
            //console.error(err);
        }
    });


}