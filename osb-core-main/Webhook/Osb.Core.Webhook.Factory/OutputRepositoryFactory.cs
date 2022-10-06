﻿using System;
using Microsoft.Extensions.DependencyInjection;
using Osb.Core.Webhook.Repository;

namespace Osb.Core.Webhook.Factory.Repository
{
    public class OutputRepositoryFactory : Interfaces.IOutputRepositoryFactory
    {
        private IServiceProvider _provider;

        public OutputRepositoryFactory(IServiceProvider provider)
        {
            _provider = provider;
        }

        public IOutputRepository Create() => _provider.GetService<IOutputRepository>();
    }
}
