import {test,expect } from '@playwright/test';

test("homepage load",async ({page})=>{
    // Go
    await page.goto("/");
    // Assert
    await expect(page).toHaveTitle(/scroll/);
})


// test ("photo loads on homepage",async ({page})=>{

//     // Go
//     await page.goto("/");

//     // wait for photo to load from url
//     await page.waitForResponse(res=>res.url().includes("unsplash")&& res.status()===200);

//     // Assert
//     await expect(page.getByRole("img").first()).toBeVisible();

// })


test('user can search for photos', async ({ page }) => {
  await page.goto('/');

  const searchInput = page.getByPlaceholder('Search photos...');
  await expect(searchInput).toBeVisible();

  await searchInput.fill('mountains');
  await page.waitForTimeout(600);

  await expect(searchInput).toHaveValue('mountains');

  await expect(
    page.locator('strong').filter({ hasText: /^mountains$/ })
  ).toBeVisible();
});