const BUN_NAME = 'Краторная булка N-200i';
const MAIN_NAME = 'Биокотлета из марсианской Магнолии';
const SAUCE_NAME = 'Соус Spicy-X';

const BUN_ID = '643d69a5c3f7b9001cfa093c';
const MAIN_ID = '643d69a5c3f7b9001cfa0941';
const ORDER_NUMBER = '12345';

const addIngredientByName = (name: string) => {
  cy.contains('li', name).within(() => {
    cy.contains('button', 'Добавить').click();
  });
};

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 401,
      body: { success: false, message: 'Unauthorized' }
    }).as('getUser');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('добавляет булку и начинки в конструктор', () => {
    addIngredientByName(BUN_NAME);
    addIngredientByName(MAIN_NAME);
    addIngredientByName(SAUCE_NAME);

    cy.get('[data-testid="burger-constructor"]').within(() => {
      cy.contains(`${BUN_NAME} (верх)`).should('exist');
      cy.contains(`${BUN_NAME} (низ)`).should('exist');
      cy.contains(MAIN_NAME).should('exist');
      cy.contains(SAUCE_NAME).should('exist');
    });
  });

  it('открывает модальное окно ингредиента и закрывает по крестику', () => {
    cy.contains('a', BUN_NAME).click();

    cy.get('[data-testid="modal"]').should('exist');
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-testid="modal"]').should('contain.text', BUN_NAME);

    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('закрывает модальное окно ингредиента по клику на оверлей', () => {
    cy.contains('a', MAIN_NAME).click();

    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-overlay"]').click({ force: true });
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('создаёт заказ и очищает конструктор после закрытия модалки заказа', () => {
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
        win.document.cookie = 'accessToken=Bearer%20test-access-token;path=/';
      }
    });

    cy.wait('@getIngredients');
    cy.wait('@getUser');

    addIngredientByName(BUN_NAME);
    addIngredientByName(MAIN_NAME);

    cy.contains('button', 'Оформить заказ').click();

    cy.wait('@createOrder')
      .its('request.body.ingredients')
      .should('deep.equal', [BUN_ID, MAIN_ID, BUN_ID]);

    cy.get('[data-testid="modal"]').should('exist');
    cy.contains(ORDER_NUMBER).should('exist');

    cy.get('[data-testid="modal-close-button"]').click();
    cy.get('[data-testid="modal"]').should('not.exist');

    cy.get('[data-testid="burger-constructor"]').within(() => {
      cy.contains('Выберите начинку').should('exist');
      cy.get('div').then(($divs) => {
        const bunPlaceholders = [...$divs].filter((div) =>
          div.textContent?.includes('Выберите булки')
        );
        expect(bunPlaceholders).to.have.length(2);
      });
    });
  });
});
