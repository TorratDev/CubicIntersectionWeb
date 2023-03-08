using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace CubicIntersectionWeb.Pages;

public sealed class Cubic
{
    public Cubic(Dimension dimension, Center center)
    {
        Dimension = dimension;
        Center = center;
    }

    public Dimension Dimension { get; set; }
    public Center Center { get; set; }

    public override string ToString()
    {
        return $"{{ Dimension: {Dimension}, Center: {Center} }}";
    }
}

public sealed class Dimension
{
    public Dimension(double x, double y, double z)
    {
        X = x;
        Y = y;
        Z = z;
    }

    public double X { get; set; }
    public double Y { get; set; }
    public double Z { get; set; }

    public override string ToString()
    {
        return $"{{ {X}, {Y}, {Z} }}";
    }
}

public sealed class Center
{
    public Center(double x, double y, double z)
    {
        X = x;
        Y = y;
        Z = z;
    }

    public double X { get; set; }
    public double Y { get; set; }
    public double Z { get; set; }

    public override string ToString()
    {
        return $"{{ {X}, {Y}, {Z} }}";
    }
}