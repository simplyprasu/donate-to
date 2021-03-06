﻿using DonateTo.ApplicationCore.Entities;
using DonateTo.Infrastructure.Data.EntityFramework;

namespace DonateTo.Infrastructure.Data.Repositories
{
    public class UserRepository : EntityFrameworkRepository<User, DonateToDbContext>
    {
        public UserRepository(DonateToDbContext dbContext) : base(dbContext)
        {
        }
    }
}
