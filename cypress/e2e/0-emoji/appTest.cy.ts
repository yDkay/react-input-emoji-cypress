/// <reference types="cypress" />

describe("App Tests", () => {
  it("Measures homepage load ", () => {
    cy.visit("http://localhost:3000/react-input-emoji", {
      onBeforeLoad: win => {
        win.performance.mark("start-loading");
      }
    })
      .its("performance")
      .then(performance => {
        cy.getData("title")
          .should("have.text", "react-input-emoji")
          .then(() => performance.mark("end-loading"))
          .then(() => {
            performance.measure("pageLoad", "start-loading", "end-loading");
            const measure = performance.getEntriesByName("pageLoad")[0];
            const duration = measure.duration;
            assert.isAtMost(duration, 4000);
            cy.log(`Load Duration ${duration} ms`);
          });
      });
  });
  it("Header Text Tests", () => {
    cy.getData("title").should("have.text", "react-input-emoji");
    cy.getData("subtitle").should(
      "have.text",
      "A React input that supports emojis"
    );
  });
  it("Git Tests", () => {
    cy.getData("gitWatch").should(
      "have.attr",
      "src",
      "https://ghbtns.com/github-btn.html?user=cesarwbr&repo=react-input-emoji&type=watch&count=true&size=large"
    );
    cy.getData("gitFork").should(
      "have.attr",
      "src",
      "https://ghbtns.com/github-btn.html?user=cesarwbr&repo=react-input-emoji&type=fork&count=true&size=large"
    );
  });
  it("Example input/emoji Tests/Props", () => {
    cy.getData("exampleInput").type("Typing Works!");
    cy.wait(1000);
    cy.get(".react-input-emoji--button--icon").click();
    cy.get(".emoji-mart-anchors").should("be.visible");
    cy.get(
      "#root > main > div > div > div.react-emoji-picker--container > div > div > section > div.emoji-mart-scroll > section:nth-child(2) > ul > li:nth-child(1) > button"
    ).click();
    cy.get(".react-input-emoji--button--icon").click();
    cy.getData("exampleCode").should("be.visible");
    cy.getData("propsTable").should("be.visible");
  });

  it("Footer Tests", () => {
    cy.getData("footerData").contains(
      "Made by Cesar William under MIT license"
    );

    cy.getData("gitCesar").should(
      "have.attr",
      "href",
      "https://github.com/cesarwbr"
    );
    cy.getData("mitCesar").should(
      "have.attr",
      "href",
      "https://cesarwilliam.mit-license.org/"
    );
  });
});

describe("Api/DB Test Describe", () => {
  it("Api Test", () => {
    cy.apiTest(200);
  });
  it("DB Test", () => {
    /* cy.bancoTest("arenaTest"); */
  });
});
