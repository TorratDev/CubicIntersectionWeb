using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace CubicIntersectionWeb.Pages;

public partial class Index : ComponentBase
{
    private double CubicSize { get; set; } = 1;
    private double CubicSize2 { get; set; } = 1;
    private double CubicCenter { get; set; } = 0.75;
    private double CubicCenter2 { get; set; }
    private Cubic Cubic1 { get; set; }
    private Cubic Cubic2 { get; set; }

    public Index()
    {
        Cubic1 = new Cubic(
            new Dimension(CubicSize, CubicSize, CubicSize),
            new Center(CubicCenter, CubicCenter, CubicCenter));

        Cubic2 = new Cubic(
            new Dimension(CubicSize2, CubicSize2, CubicSize2),
            new Center(CubicCenter2, CubicCenter2, CubicCenter2));
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        UpdateCubic1();
        UpdateCubic2();

        Console.WriteLine(CubicCenter);
        Console.WriteLine(CubicCenter2);
        Console.WriteLine(Cubic1);
        Console.WriteLine(Cubic2);
        if (firstRender)
        {
            await JsRuntime.InvokeVoidAsync("setup", Cubic1, Cubic2);
        }
        else
        {
            await JsRuntime.InvokeVoidAsync("updateCube", Cubic1, Cubic2);
        }
    }

    private void UpdateCubic2()
    {
        Cubic2.Dimension.X = CubicSize2;
        Cubic2.Dimension.Y = CubicSize2;
        Cubic2.Dimension.Z = CubicSize2;
        Cubic2.Center.X = CubicCenter2;
        Cubic2.Center.Y = CubicCenter2;
        Cubic2.Center.Z = CubicCenter2;
    }

    private void UpdateCubic1()
    {
        Cubic1.Dimension.X = CubicSize;
        Cubic1.Dimension.Y = CubicSize;
        Cubic1.Dimension.Z = CubicSize;
        Cubic1.Center.X = CubicCenter;
        Cubic1.Center.Y = CubicCenter;
        Cubic1.Center.Z = CubicCenter;
    }
}