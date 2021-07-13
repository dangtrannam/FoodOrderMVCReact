using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FoodOrderMVCReact.Startup))]
namespace FoodOrderMVCReact
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
