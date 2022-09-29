/// <reference types="cypress" />

Cypress.Commands.add("getData", (dataTest: string) => {
  cy.get(`[data-cy="${dataTest}"]`);
});

Cypress.Commands.add("apiTest", (dataApi: number) => {
  const apiTest = {
    method: "GET",
    url: "http://localhost:3000/react-input-emoji"
  };
  cy.request(apiTest)
    .its("status")
    .then(res => {
      expect(res).to.equal(dataApi);
      console.log("Response Status: " + res);
    });
});

/* Cypress.Commands.add("bancoTest", () => {
  cy.task("dbQuery", {
    query: `select
    res.categoria,
    res.subcategoria
  from (
      SELECT 
        json_data.key as categoria,
        json_data.value,
        json_array_elements(json_data.value::json)::json->>'value' as subcategoria
      FROM arena_entities.system_parameters, 
        json_each_text(system_parameters."object") AS json_data
      where
        "type" = 'company_sub_categories'
        and json_data.key = (
                    select
                      categories.category
                    from (
                        SELECT json_array_elements(sp."object") ::json->>'value' as category
                        FROM arena_entities.system_parameters sp
                        where
                          sp."type" = 'company_categories'
                      ) as categories
                    order by random()
                    limit 1
                  )
    ) as res
  order by random()
  limit 1`,
    connection: environment.dbConnection,
  }).then((queryResponse) => {
    cy.log("teste: ", queryResponse);
  });
}); */
