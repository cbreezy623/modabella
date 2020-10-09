import moment from 'moment';
import 'whatwg-fetch';

const ROOT = `/api`;

// local functions

function removeCustomerID(customer: customer) : newCustomer {
    return ({
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone,
        email: customer.email,
        notes: customer.notes,
    });
}

function removeModifierID(modifier: modifier) :newModifier {
    return ({
        name: modifier.name,
        price: modifier.price,
    })
}

function removeServiceID(service: service) : newService {
    return ({
        name: service.name,
        price: service.price,
        category: service.category,
    });
}

function removeProductID(product: product) : newProduct {
    return ({
        name: product.name,
        price: product.price,
        brand: product.brand,
    })
}

function process(res: any) { return res.json() }

// get requests

export async function getAppointment(id: number) {
    const res = await fetch(`${ROOT}/schedulerAppointments/${id}`);
    return process(res);
}

export async function getAppointmentPSales(id: number) {
    const res = await fetch(`${ROOT}/psales/?appointment=${id}`);
    return process(res);
}

export async function getAppointmentSSales(id: number) {
    const res = await fetch(`${ROOT}/ssales/?appointment=${id}`);
    return process(res);
}

export async function getAppointmentEntries() {
    const res = await fetch(`${ROOT}/appointmentEntries`);
    return process(res);
}

export async function getAppointmentEntriesRange(start: string, end: string) {
    let newEnd = moment(end).endOf('day').format();
    const res = await fetch(`${ROOT}/appointmentEntries?start=${moment(start).format()}&end=${newEnd}`);
    return process(res);
}

export async function getAppointmentEntriesCustomer(customer: number) {
    const res = await fetch(`${ROOT}/appointmentEntries?customer=${customer}`);
    return process(res);
}

export async function getAppointmentDetails(id: number) {
    const res = await fetch(`${ROOT}/schedulerAppointmentsDetails/${id}`);
    return process(res);
}

export async function getCustomer(id: number) {
    const res = await fetch(`${ROOT}/customers/${id}`);
    return process(res);
}

export async function getModifier(id: number) {
    const res = await fetch(`${ROOT}/modifiers/${id}`);
    return process(res);
}

export async function getProduct(id: number) {
    const res = await fetch(`${ROOT}/products/${id}`);
    return process(res);
}

export async function getPSaleDetailed(id: number) {
    const res = await fetch(`${ROOT}/psalesDetailed/${id}`);
    return process(res);
}

export async function getService(id: number) {
    const res = await fetch(`${ROOT}/services/${id}`);
    return process(res);
}

export async function getSSaleDetailed(id: number) {
    const res = await fetch(`${ROOT}/ssalesDetailed/${id}`);
    return process(res);
}

export async function getAppointmentTotals(appointment: number) {
    const res = await fetch(`${ROOT}/appointmentsTotals/${appointment}`);
    return process(res);
}

// get all

export async function getAllCustomers() {
    const res = await fetch(`${ROOT}/customers/`);
    return process(res);
}

export async function getAllAppointments() {
    const res = await fetch(`${ROOT}/schedulerAppointments`);
    return process(res);
}

export async function getAllBrands() {
    const res = await fetch(`${ROOT}/brands/`);
    return process(res);
}

export async function getAllCategories() {
    const res = await fetch(`${ROOT}/categories/`);
    return process(res);
}

export async function getAllModifiers() {
    const res = await fetch(`${ROOT}/modifiers`);
    return process(res);
}

export async function getAllSchedulerCustomers() {
    const res = await fetch(`${ROOT}/schedulerCustomers`);
    return process(res);
}

export async function getAllProducts() {
    const res = await fetch(`${ROOT}/products`);
    return process(res);
}

export async function getAllPSalesDetailed() {
    const res = await fetch(`${ROOT}/psalesDetailed`);
    return process(res);
}

export async function getAllServices(){
    const res = await fetch(`${ROOT}/services`);
    return process(res);
}

export async function getAllSMSales(){
    const res = await fetch(`${ROOT}/smsales`);
    return process(res);
}

export async function getAllSSalesDetailed() {
    const res = await fetch(`${ROOT}/ssalesDetailed`);
    return process(res);
}

// get queries

export async function getProductsByBrand(brand: number) {
    const res = await fetch(`${ROOT}/products?brand=${brand}`);
    return process(res);
}

export async function getPSalesByAppointment(appointment: number) {
    const res = await fetch(`${ROOT}/psalesDetailed/?appointment=${appointment}`);
    return process(res);
}

export async function getServiceByCategory(category: number) {
    const res = await fetch(`${ROOT}/services?category=${category}`);
    return process(res);
}

export async function getSSalesByAppointment(appointment: number) {
    const res = await fetch(`${ROOT}/ssalesDetailed/?appointment=${appointment}`);
    return process(res);
}

export async function getServModByBoth(service: number, modifier: number){
    const res = await fetch(`${ROOT}/servmods/?service=${service}&modifier=${modifier}`);
    return process(res);
}

export async function getServModsByService(service: number) {
    const res = await fetch(`${ROOT}/servmods/?service=${service}`);
    return process(res);
}

// post requests

function ppheaders(csrftoken: string){
    return ({
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json"
    });
}

export async function addAppointment(appointment: appointment, csrftoken: string){
    let data = appointment;
    data.rRule = "";
    const res = await fetch(`${ROOT}/schedulerAppointments/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(data),
    });
    return process(res);
}

export async function addBrand(brand: newBrand, csrftoken: string){
    const res = await fetch(`${ROOT}/brands/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(brand),
    });
    return process(res);
}

export async function addCategory(category: category, csrftoken: string){
    const res = await fetch(`${ROOT}/categories/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(category),
    });
    return process(res);
}

export async function addCustomer(customer: customer, csrftoken: string) {
    const res = await fetch(`${ROOT}/customers/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(removeCustomerID(customer)),
    });
    return process(res);
}

export async function addModifier(modifier: newModifier, csrftoken: string){
    const res = await fetch(`${ROOT}/modifiers/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(modifier),
    });
    return process(res);
}

export async function addServMod(servmod: servmod, csrftoken: string) {
    const res = await fetch(`${ROOT}/servmods/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(servmod),
    });
    return process(res);
}

export async function addPSale(psale: newPsale, csrftoken: string) {
    const res = await fetch(`${ROOT}/psales/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(psale),
    });
    return process(res);
}

export async function addSSale(ssale: newSsale, csrftoken: string ) {
    const res = await fetch(`${ROOT}/ssales/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(ssale),
    });
    return process(res);
}

export async function postTotals(totals: totals, csrftoken: string) {
    const res = await fetch(`${ROOT}/appointmentsTotals/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(totals),
    });
    return process(res);
}

export async function addProduct(product: product, csrftoken: string) {
    const res = await fetch(`${ROOT}/products/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(removeProductID(product)),
    });
    return process(res);
}

export async function addService(service: service, csrftoken: string) {
    const res = await fetch(`${ROOT}/services/`, {
        method: 'post',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(removeServiceID(service)),
    });
    return process(res);
}

// put requests

export async function updateAppointment(id: number, updated: any, csrftoken: string) {
    const res = await fetch(`${ROOT}/schedulerAppointments/${id}/`, {
        method: 'put',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(updated),
    });
    return process(res);
}

export async function updateCustomer(customer: customer, csrftoken: string) {
    const res = await fetch(`${ROOT}/customers/${customer.id}/`, {
        method: 'put',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(removeCustomerID(customer)),
    });
    return process(res);
}

export async function updateModifier(modifier: modifier, csrftoken: string) {
    const res = await fetch(`${ROOT}/modifiers/${modifier.id}/`, {
        method: 'put',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(removeModifierID(modifier)),
    });
    return process(res);
}

export async function updateProduct(product: product, csrftoken: string) {
    const res = await fetch(`${ROOT}/products/${product.id}/`, {
        method: 'put',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(removeProductID(product)),
    });
    return process(res);
}

export async function updateService(service: service, csrftoken: string) {
    const res = await fetch(`${ROOT}/services/${service.id}/`, {
        method: 'put',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(removeServiceID(service)),
    });
    return process(res);
}

export async function putTotals(totals: totals, csrftoken: string) {
    const res = await fetch(`${ROOT}/appointmentsTotals/${totals.appointment}/`, {
        method: 'put',
        credentials: 'include',
        headers: ppheaders(csrftoken),
        body: JSON.stringify(totals),
    });
    return process(res);
}

// delete requests

export function deleteAppointment(id: number, csrftoken: string) {
    return fetch(`${ROOT}/schedulerAppointments/${id}/`, {
        method: 'delete',
        headers: { "X-CSRFToken": csrftoken }
    });
}

export function deletePSale(id: number, csrftoken: string) {
    return fetch(`${ROOT}/psales/${id}`, {
        method: 'delete',
        headers: { "X-CSRFToken": csrftoken },
    });
}

export function deleteServmod(id: number, csrftoken: string){
    return fetch(`${ROOT}/servmods/${id}`, {
        method: 'delete',
        headers: { "X-CSRFToken": csrftoken },
    })
}

export function deleteSSale(id: number, csrftoken: string) {
    return fetch(`${ROOT}/ssales/${id}`, {
        method: 'delete',
        headers: { "X-CSRFToken": csrftoken },
    });
}

// cookie

export function getCookie(document: Document, name: string) : string {
    let cookieValue : string | null = null;
    if(document.cookie && document.cookie !== ''){
        const cookies = document.cookie.split(';');
        for(let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].trim();
            if(cookie.substring(0, name.length + 1) === (name + '=')){
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue ? cookieValue : "";
}
