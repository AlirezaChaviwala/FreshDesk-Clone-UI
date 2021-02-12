(()=>{function e(e,t,n){for(var l=0;l<e.length;l++)n.setAttribute(e[l],t[l])}let t=document.getElementById("content-body"),n=document.getElementById("welcome-text");document.getElementById("freshDesk-logo").onclick=()=>{t.innerHTML="",t.append(n)},document.getElementById("create-ticket").onclick=()=>{t.innerHTML="",t.innerHTML="\n    <div class='container-fluid mt-3'>\n        <form class='text-left' id='create-ticket-form'>\n            <div class='row'>\n                <div class='col-lg-12 col-md-12 col-sm-12'>\n                    <div class=\"form-group\">\n                        <label for=\"requester_id\">Requester ID<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>\n                        <input type=\"number\" class=\"form-control\" id=\"requester_id\" aria-describedby=\"reqId-create-ticket\" name=\"requester_id\" placeholder=\"Enter ID of requester\" required>\n                        <small id=\"reqId-create-ticket\" class=\"form-text text-muted\">If no requester Id exists, please Create Contact</small>\n                    </div>\n                </div>\n            </div>\n\n\n            <div class='row'>\n                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>\n                    <div class=\"form-group\">\n                    <label for=\"type\">Type<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>\n                    <select class=\"form-control\" id=\"type\" name=\"type\" required>\n                        <option value=null>--</option>\n                        <option value='Question'>Question</option>\n                        <option value='Incident'>Incident</option>\n                        <option value='Problem'>Problem</option>\n                        <option value='Feature Request'>Feature Request</option>\n                        <option value='Refunds and Returns'>Refunds and Returns</option>\n                        <option value='Bulk Orders'>Bulk Orders</option>\n                        <option value='Refund'>Refund</option>\n                    </select>\n                    </div>\n                </div>\n                <div class='col-lg-6 col-md-6 col-sm-12'>\n                    <div class=\"form-group\">\n                        <label for=\"subject\">Subject<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>\n                        <input type=\"text\" class=\"form-control\" id=\"subject\" name=\"subject\" placeholder=\"Enter Subject\" required>\n                    </div>\n                </div>\n            </div>\n\n            <div class='row'>\n                <div class='order-0 col-lg-6 col-md-6 col-sm-12'>\n                    <div class=\"form-group\">\n                    <label for=\"priority\">Priority<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>\n                    <select class=\"form-control\" id=\"priority\" name=\"priority\" required>\n                        <option value=null>--</option>\n                        <option value='1'>Low</option>\n                        <option value='2'>Medium</option>\n                        <option value='3'>High</option>\n                        <option value='4'>Urgent</option>\n                    </select>\n                    </div>\n                </div>\n                <div class='col-lg-6 col-md-6 col-sm-12'>\n                    <div class=\"form-group\">\n                        <label for=\"status\">Status<small style='color:red;' class='font-weight-bold font-italic'> *</small></label>\n                        <select class=\"form-control\" id=\"status\" name=\"status\" required>\n                            <option value=null>--</option>\n                            <option value='2'>Open</option>\n                            <option value='3'>Pending</option>\n                            <option value='4'>Resolved</option>\n                            <option value='5'>Closed</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n\n            <div class='row'>\n                <div class='order-0 col-lg-12 col-md-12 col-sm-12'>\n                    <div class=\"form-group\">\n                        <label for=\"description\">Description</label>\n                        <textarea class=\"form-control\" name='description' id=\"description\" rows=\"3\" placeholder='Please describe your query'></textarea>\n                        <small style='color:red;' class='font-italic'>* Required field(s)</small>\n                    </div>\n                </div>\n                <div class='col-lg-12 col-md-12 col-sm-12'>\n                    <div class=\"form-group\">\n                    <input type=\"number\" class=\"form-control\" id=\"responder_id\" name=\"responder_id\" hidden value='82011503395'>\n                    </div>\n                </div>\n            </div>\n            \n            <button type=\"submit\" class=\"btn btn-success btn-lg btn-block\">Save Ticket</button>\n\n        </form>\n    </div>\n    ",document.getElementById("create-ticket-form").addEventListener("submit",(async function(e){e.preventDefault();const t=new FormData(this);try{if(400==(await fetch("https://helpishere.freshdesk.com/api/v2/tickets",{method:"post",body:t,headers:{Authorization:"Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA=="}})).status)throw new Error("Invalid Input");alert("Ticket successfully created"),location.reload()}catch(e){alert("Invalid input, please enter correct details"),console.error(e)}}))},document.getElementById("list-ticket").onclick=async()=>{t.innerHTML="";try{let n=await fetch("https://helpishere.freshdesk.com/api/v2/tickets",{method:"get",headers:{Authorization:"Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA=="}});(await n.json()).forEach((n=>{let l=document.createElement("div");e(["class","style"],["card mt-3 text-left","width:100%;"],l);let o=new Date(n.created_at),s=new Date(n.fr_due_by);l.innerHTML=`\n                <div class="card-header"><h5 class='card-title'>${n.subject}</h5></div>\n                <div class="card-body">\n                    <div class='row d-flex flex-row justify-content-between align-items-end'>\n                        <div class='order-0 col-lg-4 col-md-4 col-sm-12'>\n                            <p class='card-text pb-0 mb-0'><strong>ID:</strong> ${n.id}</p>\n                            <p class="card-text pb-0 mb-0"><strong>Created:</strong> ${o.getHours()}:${o.getMinutes()} ${o.getDate()}-${o.getMonth()}-${o.getFullYear()}</p>\n                            <p class="card-text pb-0 mb-0"><strong>First Response Due by:</strong> ${s.getHours()}:${s.getMinutes()} ${s.getDate()}-${s.getMonth()}-${s.getFullYear()}</p>\n                            </div>\n                        <div class='order-1 col-lg-4 col-md-4 col-sm-12'>\n                            <p class='card-text pb-0 mb-0 font-weight-bold'><span class="badge badge-warning">Priority:</span> ${(e=>{switch(e){case 1:return"Low";case 2:return"Medium";case 3:return"High";case 4:return"Urgent"}})(n.priority)}</p>\n                            <p class='card-text pb-0 mb-0 font-weight-bold'><span class="badge badge-dark">Agent ID:</span> ${n.responder_id}</p>\n                            <p class='card-text pb-0 mb-0 font-weight-bold'><span class="badge badge-primary">Status:</span> ${(e=>{switch(e){case 2:return"Open";case 3:return"Pending";case 4:return"Resolved";case 5:return"Closed"}})(n.status)}</p>\n                        </div>\n                    </div>\n                </div>\n            `,t.append(l)}))}catch(e){console.error(e)}},document.getElementById("delete-ticket").onclick=async()=>{t.innerHTML="",t.innerHTML="\n        <div class='text-left' style='width:100%;'>\n            <p style='font-size:1.5rem;' class='mb-4 font-weight-bold'>Enter the ID of the ticket you want to delete<small style='color:red;' class='font-weight-bold font-italic'> *</small></p>\n            <form id='ticket-delete-form'>\n                <div class='row'>\n                    <div class='col-lg-8 col-md-8 col-sm-12'>\n                        <div class=\"form-group d-flex flex-column justify-content-start align-items-start text-left\">\n                            <input type=\"number\" class=\"form-control\" id=\"delete_ticket\" placeholder='Ex: 14' required>\n                            <small style='color:red;' class='font-italic'>* Required field(s)</small>\n                         </div>\n                    </div>\n\n                    <div class='col-lg-4 col-md-4 col-sm-12'>\n                        <button type=\"submit\" class=\"btn btn-danger btn-block\">Submit</button>\n                    </div>\n\n                </div>\n                \n            </form>\n        </div>   \n    ";let e=document.getElementById("delete_ticket");document.getElementById("ticket-delete-form").addEventListener("submit",(async function(t){t.preventDefault();try{if(404==(await fetch(`https://helpishere.freshdesk.com/api/v2/tickets/${e.value}`,{method:"delete",headers:{Authorization:"Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA=="}})).status)throw new Error("Invaid input");alert("Ticket successfully deleted"),location.reload()}catch(e){alert("Invalid input, please enter correct details")}}))},document.getElementById("update-ticket").onclick=()=>{t.innerHTML="",t.innerHTML='\n    <div class=\'container-fluid mt-3\'>\n\n        <form class=\'text-left\'>\n            <div class=\'row\'>\n                    <div class=\'col-lg-12 col-md-12 col-sm-12\'>\n                        <div class="form-group">\n                            <label for="ticket_update_id">Ticket ID<small style=\'color:red;\' class=\'font-weight-bold font-italic\'> *</small></label>\n                            <input type="number" class="form-control" id="ticket_update_id" aria-describedby="ticketId-update-ticket" name="ticket_update_id" placeholder="Enter Ticket Id to be updated" required>\n                            <small id="ticketId-update-ticket" class="form-text text-muted">If no such Ticket Id exists, please Create Ticket</small>\n                        </div>\n                    </div>\n            </div>\n        </form>\n        <form class=\'text-left\' id=\'update-ticket-form\'>\n\n            <div class=\'row\'>\n                <div class=\'order-0 col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                    <label for="type">Type</label>\n                    <select class="form-control" id="type" name="type">\n                        <option value=null>--</option>\n                        <option value=\'Question\'>Question</option>\n                        <option value=\'Incident\'>Incident</option>\n                        <option value=\'Problem\'>Problem</option>\n                        <option value=\'Feature Request\'>Feature Request</option>\n                        <option value=\'Refunds and Returns\'>Refunds and Returns</option>\n                        <option value=\'Bulk Orders\'>Bulk Orders</option>\n                        <option value=\'Refund\'>Refund</option>\n                    </select>\n                    </div>\n                </div>\n                <div class=\'col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="subject">Subject</label>\n                        <input type="text" class="form-control" aria-describedby="subject-update-ticket" id="subject" name="subject" placeholder="Enter Subject">\n                        <small id="subject-update-ticket" class="form-text text-muted">If no changes in subject, enter current subject</small>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\'row\'>\n                <div class=\'order-0 col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                    <label for="priority">Priority</label>\n                    <select class="form-control" id="priority" name="priority">\n                        <option value=null>--</option>\n                        <option value=\'1\'>Low</option>\n                        <option value=\'2\'>Medium</option>\n                        <option value=\'3\'>High</option>\n                        <option value=\'4\'>Urgent</option>\n                    </select>\n                    </div>\n                </div>\n                <div class=\'col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="status">Status</label>\n                        <select class="form-control" id="status" name="status">\n                            <option value=null>--</option>\n                            <option value=\'2\'>Open</option>\n                            <option value=\'3\'>Pending</option>\n                            <option value=\'4\'>Resolved</option>\n                            <option value=\'5\'>Closed</option>\n                        </select>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\'row\'>\n                <div class=\'order-0 col-lg-12 col-md-12 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="description">Description</label>\n                        <textarea class="form-control" aria-describedby="description-update-ticket" name=\'description\' id="description" rows="3" placeholder=\'Please describe your query\'></textarea>\n                        <small id="description-update-ticket" class="form-text text-muted">If no changes in description, enter current description</small>\n                        <small style=\'color:red;\' class=\'font-italic\'>* Required field(s)</small>\n                    </div>\n                </div>\n                <div class=\'col-lg-12 col-md-12 col-sm-12\'>\n                    <div class="form-group">\n                        <input type="number" class="form-control" id="responder_id" name="responder_id" hidden value=\'82011503395\'>\n                    </div>\n                </div>\n            </div>\n            \n            <button type="submit" class="btn btn-success btn-lg btn-block">Save Ticket</button>\n\n        </form>\n    </div>\n    ';let e=document.getElementById("update-ticket-form"),n=document.getElementById("ticket_update_id");e.addEventListener("submit",(async function(e){e.preventDefault();const t=new FormData(this);try{let e=await fetch(`https://helpishere.freshdesk.com/api/v2/tickets/${n.value}`,{method:"put",body:t,headers:{Authorization:"Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA=="}});if(404==e.status||400==e.status)throw new Error("Invalid Input");alert("Ticket successfully updated"),location.reload()}catch(e){alert("Invalid input, please enter correct details")}}))},document.getElementById("create-contact").onclick=()=>{t.innerHTML="",t.innerHTML='\n    <div class=\'container-fluid mt-3\'>\n        <form class=\'text-left\' id=\'create-contact-form\'>\n\n            <div class=\'row\'>\n                <div class=\'col-lg-12 col-md-12 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="name">Name<small style=\'color:red;\' class=\'font-weight-bold font-italic\'> *</small></label>\n                        <input type="text" class="form-control" id="name" name="name" placeholder="Enter Name" required>\n                </div>\n                </div>\n            </div>\n\n            <div class=\'row\'>\n                <div class=\'order-0 col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="twitter_id">Twitter ID<small style=\'color:red;\' class=\'font-weight-bold font-italic\'> *</small></label>\n                        <input type="string" class="form-control" id="twitter_id" name="twitter_id" placeholder="Enter Twitter Id" required>\n                    </div>\n                </div>\n                <div class=\'col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="email">Email ID<small style=\'color:red;\' class=\'font-weight-bold font-italic\'> *</small></label>\n                        <input type="email" class="form-control" id="email" name="email" placeholder="Enter Email Id" required>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\'row\'>\n                <div class=\'order-0 col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="phone">Phone<small style=\'color:red;\' class=\'font-weight-bold font-italic\'> *</small></label>\n                        <input type="number" class="form-control" id="phone" name="phone" placeholder="Enter Phone" required>\n                    </div>\n                </div>\n                <div class=\'col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="mobile">Mobile<small style=\'color:red;\' class=\'font-weight-bold font-italic\'> *</small></label>\n                        <input type="number" class="form-control" id="mobile" name="mobile" placeholder="Enter Mobile" required>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\'row\'>\n                <div class=\'order-0 col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="address">Address</label>\n                        <textarea type="string" class="form-control" id="address" name="address" rows=\'3\' placeholder="Enter Address"></textarea>\n                        <small style=\'color:red;\' class=\'font-italic\'>* Required field(s)</small>\n                    </div>\n                </div>\n                <div class=\'col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="description">Description</label>\n                        <textarea type="string" class="form-control" id="description" name="description" rows=\'3\' placeholder="Enter Description"></textarea>\n                    </div>\n                </div>\n            </div>\n            \n            <button type="submit" class="btn btn-success btn-lg btn-block">Save Contact</button>\n\n        </form>\n    </div>\n    ',document.getElementById("create-contact-form").addEventListener("submit",(async function(e){e.preventDefault();const t=new FormData(this);try{if(409==(await fetch("https://helpishere.freshdesk.com/api/v2/contacts",{method:"POST",body:t,headers:{Authorization:"Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA=="}})).status)throw new Error("Duplicate Value");alert("Contact successfully created")}catch(e){"Duplicate Value"==e.message?alert("Duplicate Value"):alert("Invalid input, please enter correct details")}}))},document.getElementById("update-contact").onclick=()=>{t.innerHTML="",t.innerHTML='\n    <div class=\'container-fluid mt-3\'>\n\n        <form class=\'text-left\'>\n            <div class=\'row\'>\n            <div class=\'col-lg-12 col-md-12 col-sm-12\'>\n                <div class="form-group">\n                    <label for="contact_update_id">Contact ID<small style=\'color:red;\' class=\'font-weight-bold font-italic\'> *</small></label>\n                    <input type="number" class="form-control" id="contact_update_id" aria-describedby="contactId-update-contact" name="contact_update_id" placeholder="Enter Contact Id to be updated" required>\n                    <small id="contactId-update-contact" class="form-text text-muted">If no such Contact Id exists, please Create Contact</small>\n                </div>\n            </div>\n        </div>\n        </form>\n        <form class=\'text-left\' id=\'update-contact-form\'>\n\n            <div class=\'row\'>\n                <div class=\'col-lg-12 col-md-12 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="name">Name<small style=\'color:red;\' class=\'font-weight-bold font-italic\'> *</small></label>\n                        <input type="text" class="form-control" aria-describedby="name-update-contact" id="name" name="name" placeholder="Enter Name">\n                        <small id="name-update-contact" class="form-text text-muted">If no changes in name, enter current name</small>\n                </div>\n                </div>\n            </div>\n\n            <div class=\'row\'>\n                <div class=\'order-0 col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="twitter_id">Twitter ID</label>\n                        <input type="string" class="form-control" id="twitter_id" name="twitter_id" placeholder="Enter Twitter Id">\n                    </div>\n                </div>\n                <div class=\'col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="email">Email ID<small style=\'color:red;\' class=\'font-weight-bold font-italic\'> *</small></label>\n                        <input type="email" class="form-control" aria-describedby="email-update-contact" id="email" name="email" placeholder="Enter Email Id">\n                        <small id="email-update-contact" class="form-text text-muted">If no changes in email, enter current email</small>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\'row\'>\n                <div class=\'order-0 col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="phone">Phone</label>\n                        <input type="number" class="form-control" id="phone" name="phone" placeholder="Enter Phone">\n                    </div>\n                </div>\n                <div class=\'col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="mobile">Mobile</label>\n                        <input type="number" class="form-control" id="mobile" name="mobile" placeholder="Enter Mobile">\n                    </div>\n                </div>\n            </div>\n\n            <div class=\'row\'>\n                <div class=\'order-0 col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="address">Address</label>\n                        <textarea type="string" class="form-control" id="address" name="address" rows=\'3\' placeholder="Enter Address"></textarea>\n                        <small style=\'color:red;\' class=\'font-italic\'>* Required field(s)</small>\n                    </div>\n                </div>\n                <div class=\'col-lg-6 col-md-6 col-sm-12\'>\n                    <div class="form-group">\n                        <label for="description">Description</label>\n                        <textarea type="string" class="form-control" id="description" name="description" rows=\'3\' placeholder="Enter Description"></textarea>\n                    </div>\n                </div>\n            </div>\n            \n            <button type="submit" class="btn btn-success btn-lg btn-block">Save Contact</button>\n\n        </form>\n    </div>\n    ';let e=document.getElementById("update-contact-form"),n=document.getElementById("contact_update_id");e.addEventListener("submit",(async function(e){e.preventDefault();const t=new FormData(this);try{let e=await fetch(`https://helpishere.freshdesk.com/api/v2/contacts/${n.value}`,{method:"put",body:t,headers:{Authorization:"Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA=="}});if(404==e.status)throw new Error("Invalid Input");if(409==e.status)throw new Error("Duplicate Value");alert("Contact successfully updated"),location.reload()}catch(e){"Duplicate Value"==e.message?alert("Duplicate value"):alert("Invalid input, please enter correct details")}}))},document.getElementById("list-contact").onclick=async()=>{t.innerHTML="";const n=e=>null===e?"--":e;try{let l=await fetch("https://helpishere.freshdesk.com/api/v2/contacts",{method:"get",headers:{Authorization:"Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA=="}});(l=>{let o=document.createElement("div");e(["class"],["table-responsive"],o);let s=document.createElement("table");e(["class"],["table"],s),o.append(s),t.append(o);let a=document.createElement("thead");a.className="table-success",s.append(a);let i=document.createElement("tr");a.append(i),a.innerHTML='\n            <th scope="col">ID</th>\n            <th scope="col">Contact</th>\n            <th scope="col">Title</th>\n            <th scope="col">Company</th>\n            <th scope="col">Email Address</th>\n            <th scope="col">Work Phone</th>\n            <th scope="col">Facebook ID</th>\n            <th scope="col">Twitter ID</th>\n        ';let c=document.createElement("tbody");s.append(c),l.forEach((e=>{let t=document.createElement("tr");t.innerHTML=`\n                <th scope="row">${e.id}</th>\n                <td>${e.name}</td>\n                <td>${n(e.job_title)}</td>\n                <td>${n(e.company_id)}</td>\n                <td>${e.email}</td>\n                <td>${n(e.phone)}</td>\n                <td>${n(e.facebook_id)}</td>\n                <td>${n(e.twitter_id)}</td>\n            `,c.append(t)}))})(await l.json())}catch(e){console.error(e)}},document.getElementById("delete-contact").onclick=async()=>{t.innerHTML="",t.innerHTML="\n        <div class='text-left' style='width:100%;'>\n            <p style='font-size:1.5rem;' class='mb-4 font-weight-bold'>Enter the ID of the contact you want to delete<small style='color:red;' class='font-weight-bold font-italic'> *</small></p>\n            <form id='delete-contact-form'>\n                <div class='row'>\n                    <div class='col-lg-8 col-md-8 col-sm-12'>\n                        <div class=\"form-group d-flex flex-column justify-content-start align-items-start text-left\">\n                            <input type=\"number\" class=\"form-control\" id=\"delete_contact\" placeholder='Ex: 12345678912' required>\n                            <small style='color:red;' class='font-italic'>* Required field(s)</small>\n                         </div>\n                    </div>\n\n                    <div class='col-lg-4 col-md-4 col-sm-12'>\n                        <button type=\"submit\" class=\"btn btn-danger btn-block\">Submit</button>\n                    </div>\n                </div>\n                \n            </form>\n        </div>   \n    ";let e=document.getElementById("delete_contact");document.getElementById("delete-contact-form").addEventListener("submit",(async function(t){t.preventDefault();try{if(404==(await fetch(`https://helpishere.freshdesk.com/api/v2/contacts/${e.value}`,{method:"DELETE",headers:{Authorization:"Basic cUFRQWhiUEIzQ3RTZTgybzU4WHk6eA=="}})).status)throw"Invalid input";alert("Contact successfully deleted"),location.reload()}catch(e){alert("Invalid input, please enter correct details")}}))}})();