const baseUrl = "http://localhost:8088/employees"

const api = {
  getData() {
    return fetch(baseUrl)
      .then(resp => resp.json())
      .then(employees => employees.forEach(employee => {
        const id = getEmployeeId(employee);
        console.log(id)
        useIdToExpand(id)
      }))
  }
};

const getEmployeeId = (employeeObject) => {
  const employeeId = employeeObject.id;
  console.log("employeeId", employeeId)
  return employeeId

}

const useIdToExpand = (id) => {
  fetch(`${baseUrl}/${id}?_expand=computer&_expand=department`)
    .then(resp => resp.json())
    .then(employee => {
      printToDom(employee)
    })
}

const printToDom = (object) => {

  const htmlFactory = (object) => {
    return `
      <article class="employee">
        <header class="employee__name">
            <h1>${object.name}</h1>
        </header>
        <section class="employee__department">
            Works in the ${object.department.department} department
        </section>
        <section class="employee__computer">
            Currently using a ${object.computer.computer}
        </section>
    </article>`
  }


  const targetDom = document.getElementById("printSection")
  const html = htmlFactory(object)
  // console.log(html)

  targetDom.innerHTML += html

}

api.getData();