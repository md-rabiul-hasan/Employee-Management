<template>
    <div>        
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Users</h1>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            Create Employee
                            <router-link :to="{ name: 'EmployeesIndex'}"  class="float-right" >Back</router-link>
                        </div>
                         <div class="card-body">
                        <form @submit.prevent="storeEmployee">
                            <div class="form-group row">
                                <label for="first_name" class="col-md-4 col-form-label text-md-right">First Name</label>
                                <div class="col-md-6">
                                    <input id="first_name" v-model="form.first_name" type="text" class="form-control" name="first_name"  required autocomplete="first_name" autofocus>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="middle_name" class="col-md-4 col-form-label text-md-right">Middle Name</label>
                                <div class="col-md-6">
                                    <input v-model="form.middle_name" id="middle_name" type="text" class="form-control" name="middle_name"  required autocomplete="middle_name" autofocus>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="last_name" class="col-md-4 col-form-label text-md-right">Last Name</label>
                                <div class="col-md-6">
                                    <input v-model="form.last_name" id="last_name" type="text" class="form-control" name="last_name"  required autocomplete="last_name" autofocus>
                                </div>
                            </div>
                            
                            <div class="form-group row">
                                <label for="address" class="col-md-4 col-form-label text-md-right">Address</label>
                                <div class="col-md-6">
                                    <input v-model="form.address" id="address" type="text" class="form-control" name="address"  required autocomplete="address" autofocus>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="country_code" class="col-md-4 col-form-label text-md-right">Country</label>
                                <div class="col-md-6">
                                    <select v-model="form.country_id" @change="getState()" name="country_id" class="form-control" aria-label="Default select example">
                                        <option >Select Country</option> 
                                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>                                           
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="state_id" class="col-md-4 col-form-label text-md-right">State</label>
                                <div class="col-md-6">
                                    <select v-model="form.state_id" @change="getCity" name="state_id" class="form-control" aria-label="Default select example">
                                        <option v-for="state in states" :key="state.id" :value="state.id">{{  state.name  }}</option>                                            
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="city_id" class="col-md-4 col-form-label text-md-right">City</label>
                                <div class="col-md-6">
                                    <select v-model="form.city_id" name="city_id" class="form-control" aria-label="Default select example">
                                        <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>                                            
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="department_id" class="col-md-4 col-form-label text-md-right">Department</label>
                                <div class="col-md-6">
                                    <select v-model="form.department_id" name="department_id" class="form-control" aria-label="Default select example">
                                        <option v-for="department in departments" :key="department.id" :value="department.id">{{ department.name }}</option>                                            
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="zip_code" class="col-md-4 col-form-label text-md-right">Zip Code</label>
                                <div class="col-md-6">
                                    <input v-model="form.zip_code" id="zip_code" type="text" class="form-control" name="zip_code"  required autocomplete="zip_code" autofocus>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="birthdate" class="col-md-4 col-form-label text-md-right">DOB</label>
                                <div class="col-md-6">
                                    <input v-model="form.birthdate" id="birthdate" type="date" class="form-control" name="birthdate"  required autocomplete="birthdate" autofocus>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="date_hired" class="col-md-4 col-form-label text-md-right">Hired Date</label>
                                <div class="col-md-6">
                                    <input v-model="form.date_hired" id="date_hired" type="date" class="form-control" name="date_hired"  required autocomplete="date_hired" autofocus>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Store
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            countries: [],
            states: [],
            departments: [],
            cities: [],
            form: {
                first_name: "",
                last_name: "",
                middle_name: "",
                address: "",
                country_id: "",
                state_id: "",
                department_id: "",
                city_id: "",
                zip_code: "",
                birthdate: null,
                date_hired: null
            }
        };
    },
    created() {
        this.getCountries();
        this.getDepartments();
    },
    methods: {
        getCountries() {
            axios
                .get("/api/employees/countries")
                .then(res => {
                    this.countries = res.data;
                })
                .catch(error => {
                    console.log(console.error);
                });
        },
        getState() {
            axios
                .get("/api/employees/" + this.form.country_id +"/states")
                .then(res => {
                    this.states = res.data;
                })
                .catch(error => {
                    console.log(console.error);
                });
        },
        getCity(){
            axios
                .get("/api/employees/"+ this.form.state_id +"/cities")
                .then(res => {
                    this.cities = res.data;
                })
                .catch(error => {
                    console.log(console.error);
                });
        },
         getDepartments() {
            axios
                .get("/api/employees/departments")
                .then(res => {
                    this.departments = res.data;
                })
                .catch(error => {
                    console.log(console.error);
                });
        },
        storeEmployee(){
           axios
                .post("/api/employees",{
                    first_name   : this.form.first_name,
                    last_name    : this.form.last_name,
                    middle_name  : this.form.middle_name,
                    address      : this.form.address,
                    country_id   : this.form.country_id,
                    state_id     : this.form.state_id,
                    city_id      : this.form.city_id,
                    department_id: this.form.department_id,
                    zip_code     : this.form.zip_code,
                    birthdate    : this.form.birthdate,
                    date_hired   : this.form.date_hired,
                })
                .then(res => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(console.error);
                }); 
        }

    }
};
</script>

