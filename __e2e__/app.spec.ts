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
  // 1. GO
  await page.goto('/');

  // 2. Wait for initial browse photos to load
  await page.waitForResponse(res =>
    res.url().includes('api.unsplash.com/photos') && res.status() === 200
  );

  // 3. ACT — type in search input
  await page.getByPlaceholder('Search photos...').fill('mountains');

  // 4. Wait for debounce — your NavBar debounces by 500ms
  await page.waitForTimeout(600);

  // 5. Wait for search API response
  await page.waitForResponse(res =>
    res.url().includes('api.unsplash.com/search/photos') && res.status() === 200
  );

  // 6. ASSERT — search banner appears
  await expect(page.getByText('mountains')).toBeVisible();

  // 7. ASSERT — photos appear
  await expect(page.getByRole('img').first()).toBeVisible();
});