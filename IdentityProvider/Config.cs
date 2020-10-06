// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace IdentityProvider
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("api"),
            };

        // public static IEnumerable<ApiResource> ApiResources =>
        //     new ApiResource[]
        //     {
        //         new ApiResource("api", "API")
        //     };

        public static IEnumerable<Client> Clients(IConfiguration Configuration) =>
            new Client[]
            {
                // interactive client using code flow + pkce
                new Client
                {
                    ClientId = "client-app",
                    ClientName = "Client App",
                    AllowedGrantTypes = GrantTypes.Code,

                    RequirePkce = true,
                    RequireClientSecret = false,
                    
                    RedirectUris =           { Configuration.GetValue<string>("SPA_REDIRECT_URL") },
                    PostLogoutRedirectUris = { Configuration.GetValue<string>("SPA_URL") },
                    AllowedCorsOrigins =     { Configuration.GetValue<string>("SPA_URL") },

                    AllowedScopes =
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "api"
                    }
                }
            };
    }
}