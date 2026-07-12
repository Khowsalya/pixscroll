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