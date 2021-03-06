﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DonateTo.ApplicationCore.Entities;
using DonateTo.ApplicationCore.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace DonateTo.WebApi.V1.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    public class AddressController : BaseApiController<Address>
    {
        public AddressController(IBaseService<Address> addressService) : base(addressService)
        {
        }

        /// <summary>
        /// Use the method to request a list of Addresses associated with an Organization by Organization Id from the server.
        /// </summary>
        /// <param name="organizationId">ID of the Organization resource to be search.</param>
        /// <returns>Status 200 if the request has succeeded,
        /// Status 500 if that have an error</returns>
        [HttpGet("[action]", Name = "[controller]_[action]")]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<Address>>> GetByOrganization(long organizationId)
        {
            try
            {
                var result = await _baseService.GetAsync(x => x.OrganizationId == organizationId).ConfigureAwait(false);

                if(!result.Any())
                {
                    return NotFound();
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}