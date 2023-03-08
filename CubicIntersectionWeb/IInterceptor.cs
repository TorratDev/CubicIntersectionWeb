using System.Threading.Tasks;
using CubicIntersectionWeb.Pages;

namespace CubicIntersectionWeb;

public interface IInterceptor
{
    internal Task<(bool areCollinding, double volume)> GetIntersection(Cubic cubic1, Cubic cubic2);
}